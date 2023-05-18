import nodemailer from 'nodemailer';
import pug from 'pug';
import { convert } from 'html-to-text';

// Transporter
class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(user: any, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Lizz File Server <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    let EMAIL_HOST: any = process.env.EMAIL_HOST;
    let EMAIL_PORT: any = process.env.EMAIL_PORT;

    if (process.env.NODE_ENV === 'production') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_ADD,
          pass: process.env.EMAIL_PASS,
        },
      });
      return transporter;
    }

    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template: any, subject: string, attachment: any) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`./views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Defimne email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
      attachments: [attachment],
    };

    // 3) Create a transport and send email
    const info = await this.newTransport().sendMail(mailOptions);

    console.log(info);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the File Server', {});
  }

  async passwordReset() {
    await this.send(
      'passwordReset',
      'Reset Your Password (valid for 10 minutes)',
      {}
    );
  }

  async sendFile() {
    await this.send('sendFile', 'A DOCUMENT FROM LIZZ FILE SERVER', {});
  }
}

export default Email;
