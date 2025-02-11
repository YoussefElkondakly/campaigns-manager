import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import axios from 'axios';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}
  sendEmail = async (recipient: string, subject: string, body: string) => {
    // Create a transporter using SMTP (for Gmail)
    const transporter = createTransport({
      service: this.configService.get<string>('SERVICE'), // For Gmail; use other services if needed
      host: this.configService.get<string>('HOST'),
      auth: {
        user: this.configService.get<string>('EMAIL_ADDRESS'), // Your Gmail email
        pass: this.configService.get<string>('EMAIL_PASSWORD'), // Your Gmail password or app password if 2FA is enabled
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });

    // Email options
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_ADDRESS'), // Sender email
      to: recipient, // Recipient email
      subject: subject, // Email subject
      text: body, // Email body
    };

    // Send email
    await transporter.sendMail(mailOptions);
  };
  async verifyEmail(email: string): Promise<boolean> {
    console.log('hello')
    const apiKey = this.configService.get<string>('MAILBOXLAYER_API_KEY');
    console.log(apiKey);
    console.log(email)
    const url = `https://api.apilayer.com/email_verification/${email}`;

    try {
      const response = await axios.get(url, {
        headers: {
          apikey: apiKey,
        },
      });

      console.log(response.data)
            const { syntax_valid, can_connect_smtp } = response.data;
console.log(syntax_valid , can_connect_smtp );
      return syntax_valid&&can_connect_smtp
    } catch (error) {
      console.error('Email verification failed:', error);
      return false;
    }
  }
}
