import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: `"MeetSync Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Your email where you want to receive messages
      replyTo: email,
      subject: `[MeetSync Contact] ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
    .value { font-size: 16px; margin-top: 5px; }
    .message { background: white; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>MeetSync Contact Form</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${name} (${email})</div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
