type VercelRequest = { method?: string; body: any };
type VercelResponse = { setHeader(name: string, value: string): void; status(code: number): { json(body: unknown): void } };
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'steviejohnson101@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

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
  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Handle GET request (for testing)
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'Contact form endpoint is working',
      method: 'POST required to send email',
      timestamp: new Date().toISOString()
    });
  }

  // Only accept POST requests for sending email
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    // Log for debugging (remove in production)
    console.log('Contact form submission received');
    console.log('Environment check:', {
      hasApiKey: !!process.env.RESEND_API_KEY,
      recipientEmail: RECIPIENT_EMAIL,
      fromEmail: FROM_EMAIL
    });

    // Extract and validate form data
    const { name, email, inquiryType, subject, message } = req.body;

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

      // In development/debugging, return more info
      return res.status(500).json({
        error: 'Email service is not configured. RESEND_API_KEY environment variable is missing.',
        debug: {
          hasApiKey: false,
          recipientEmail: RECIPIENT_EMAIL,
          fromEmail: FROM_EMAIL,
          timestamp: new Date().toISOString()
        }
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

    console.log('Attempting to send email via Resend...');

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

      // Return detailed error in development
      return res.status(500).json({
        error: 'Failed to send email',
        details: error,
        debug: {
          hasApiKey: !!process.env.RESEND_API_KEY,
          recipientEmail: RECIPIENT_EMAIL,
          fromEmail: FROM_EMAIL
        }
      });
    }

    console.log('Email sent successfully:', data?.id);

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24-48 hours.',
      id: data?.id,
    });

  } catch (error) {
    console.error('Contact form error:', error);

    // Return detailed error for debugging
    return res.status(500).json({
      error: 'An unexpected error occurred',
      message: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        recipientEmail: RECIPIENT_EMAIL,
        fromEmail: FROM_EMAIL,
        timestamp: new Date().toISOString()
      }
    });
  }
}