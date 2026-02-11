import type { VercelRequest, VercelResponse } from '@vercel/node';

// Email service configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'stevie@steviejohnson.com';
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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
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
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');

      // Log the submission for debugging (remove in production)
      console.log('Contact form submission:', sanitizedData);

      return res.status(500).json({
        error: 'Email service is not configured. Please contact the administrator.'
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

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: RECIPIENT_EMAIL,
        subject: `Contact Form: ${sanitizedData.subject}`,
        html: emailHtml,
        reply_to: sanitizedData.email,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend API error:', errorData);

      return res.status(500).json({
        error: 'Failed to send email. Please try again later or contact us directly.'
      });
    }

    const resendData = await resendResponse.json();
    console.log('Email sent successfully:', resendData.id);

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24-48 hours.',
      id: resendData.id,
    });

  } catch (error) {
    console.error('Contact form error:', error);

    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
}