import { ContactFormData } from '@/lib/types';
import nodemailer from 'nodemailer';

// Configure your email service here
// Using environment variables for security
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate input
    if (!body.name || !body.email || !body.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create email content
    const emailContent = `
      New Contact Form Submission

      Name: ${body.name}
      Email: ${body.email}
      Inquiry Type: ${body.inquiryType}

      Message:
      ${body.message}
    `;

    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Inquiry Type:</strong> ${body.inquiryType}</p>
      <h3>Message:</h3>
      <p>${body.message.replace(/\n/g, '<br>')}</p>
    `;

    // Send email to artist
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || 'rs@rushitshah.com',
      subject: `New Contact: ${body.inquiryType} from ${body.name}`,
      text: emailContent,
      html: htmlContent,
      replyTo: body.email,
    });

    // Optional: Send confirmation email to user
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: body.email,
        subject: 'Thank you for reaching out - Rushit Shah',
        html: `
          <p>Hi ${body.name},</p>
          <p>Thank you for your message. I've received your inquiry and will get back to you within 48 hours.</p>
          <p>In the meantime, feel free to explore my work at <a href="https://www.rushitshah.com">rushitshah.com</a></p>
          <p>Best regards,<br>Rushit Shah</p>
        `,
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
