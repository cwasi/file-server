import catchAsync from '../utils/catchAsync';
import db from '../models';
import nodemailer from 'nodemailer';
import AppError from './../utils/appError';

export const sendEmail = catchAsync(async (req: any, res: any, next: any) => {
  const { to, from, subject, attachment, message } = req.body;

  console.log(from);
  console.log(to);
  console.log(subject);
  console.log(attachment);
  console.log(message);

  const file = await db.File.findOne({ where: { title: attachment } });
  if (!file) {
    return next(new AppError('Document dose not exist', 401));
  }

  const filePath = `./public/document/${attachment}`;

  await Email({
    email: to,
    subject,
    message,
    filename: attachment,
    filePath,
  });

  await db.Email.create({
    emailSentTo: to,
    FileId: file.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Email sent`',
  });
});

const Email = async (options: any) => {
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
    from: 'lizzy File server <fileserver@example.com>',
    to: options.email,
    subject: options.subject,
    html: `<p>${options.message}<p>`,
    attachments: [
      {
        filename: 'leo.jpg',
        path: './public/document/leo.jpg',
      },
    ],
  };

  //   STEP: SEND EMAIL
  await transporter.sendMail(maillOption);
};
