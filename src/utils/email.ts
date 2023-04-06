import nodemailer from 'nodemailer';

const sendEmail = async (options: any) => {
  const EMAIL_HOST: any = process.env.EMAIL_HOST;
  const EMAIL_PORT: any = process.env.EMAIL_PORT;

  // STEP: CREATE TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // STEP: DEFINE THE EMAIL OPTIONS
  const maillOption = {
    from: 'File server <fileserver@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //   STEP: SEND EMAIL
  await transporter.sendMail(maillOption);
};

export default sendEmail;
