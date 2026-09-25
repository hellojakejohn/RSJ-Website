type VercelRequest = {
  method?: string;
  body: any;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};
type VercelResponse = { setHeader(name: string, value: string): void; status(code: number): { json(body: unknown): void } };
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'steviejohnson101@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

// CORS: only the production site may call this endpoint cross-origin
const ALLOWED_ORIGINS = ['https://steviejohnson.com', 'https://www.steviejohnson.com'];

// Spam heuristics. Edit this list to tune the content filter.
const SPAM_TERMS = ['crypto', 'bitcoin', 'seo', 'backlink', 'casino', 'loan', 'viagra'];
const MAX_URLS = 2;

// Timing check: real people take a few seconds, and stale tokens are rejected
const MIN_FILL_MS = 3000;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

// Best-effort rate limit. In-memory, so it resets on cold starts and is per-instance.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissionsByIp = new Map<string, number[]>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  // Keep the map from growing unbounded on a long-lived instance
  if (submissionsByIp.size > 1000) {
    for (const [key, times] of submissionsByIp) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) submissionsByIp.delete(key);
    }
  }

  if (recent.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return false;
}

function looksLikeSpam(text: string): boolean {
  const urlCount = (text.match(/https?:\/\/|www\./gi) || []).length;
  if (urlCount > MAX_URLS) return true;
  return SPAM_TERMS.some((term) => new RegExp(`\\b${term}s?\\b`, 'i').test(text));
}

function isBadTiming(startedAt: unknown): boolean {
  const started = Number(startedAt);
  if (!startedAt || !Number.isFinite(started)) return true;
  const elapsed = Date.now() - started;
  return elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS: echo the origin back only if it's the production site
  const origin = req.headers.origin;
  if (typeof origin === 'string' && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Only accept POST requests for sending email
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({
      error: 'Method not allowed.'
    });
  }

  try {
    if (isRateLimited(getClientIp(req))) {
      return res.status(429).json({
        error: 'You\'ve sent a few messages already. Please wait a few minutes and try again, or email stevie@steviejohnson.com directly.'
      });
    }

    // Extract and validate form data
    const { name, email, inquiryType, subject, message, company, startedAt } = req.body || {};

    // Bot checks: fake success so bots don't adapt, but never send the email
    if (company || isBadTiming(startedAt)) {
      return res.status(200).json({ ok: true });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields. Name, email, and message are required.'
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email format.'
      });
    }

    if (looksLikeSpam(`${name} ${subject || ''} ${message}`)) {
      return res.status(200).json({ ok: true });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name.substring(0, 100)),
      email: sanitizeInput(email.substring(0, 100)),
      inquiryType: sanitizeInput(inquiryType || 'general'),
      subject: sanitizeInput(subject || 'Website Contact Form Submission').substring(0, 200),
      message: sanitizeInput(message.substring(0, 5000)),
    };

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({
        error: 'Sorry, the contact form is temporarily unavailable. Please email stevie@steviejohnson.com directly.'
      });
    }

    // Prepare email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4A90E2; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedData.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${sanitizedData.email}</p>
          <p style="margin: 10px 0;"><strong>Inquiry Type:</strong> ${sanitizedData.inquiryType}</p>
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
        </div>

        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>This email was sent from the contact form at steviejohnson.com</p>
          <p>Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
        </div>
      </div>
    `;

    // Send email using Resend SDK
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: `Contact Form: ${sanitizedData.subject}`,
      html: emailHtml,
      replyTo: sanitizedData.email,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({
        error: 'Failed to send email'
      });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24-48 hours.',
      id: data?.id,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred'
    });
  }
}