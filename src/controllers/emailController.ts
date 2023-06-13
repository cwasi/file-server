import catchAsync from '../utils/catchAsync';
import db from '../models';
import pug from 'pug';
import nodemailer from 'nodemailer';
import AppError from './../utils/appError';


export const sendFile = catchAsync(async (req: any, res: any, next: any) => {
  const { SentFileTo, document } = req.body;

  const user = await db.User.findOne({ where: { email: SentFileTo } });
  if (!user) {
    return next(new AppError('User dose not exist', 401));
  }

  const file = await db.File.findOne({ where: { title: document } });

  if (!file) {
    return next(new AppError('Document dose not exist', 401));
  }

  await db.Email.create({
    emailSentTo: user.email,
    FileId: file.id,
  });

  const attachment = {
    filename: document,
    path: `./public/document/${document}`,
  };


  await EmailWithAttactment({
    email: req.body.SentFileTo,
    firstName: user.name.split(' ')[0],
    subject: 'A DOCUMENT FROM LIZZ FILE SERVER',
    attachment,
  });

  res.status(201).json({
    status: 'success',
    message: 'File sent`',
  });
});

const EmailWithAttactment = async (options: any) => {
  const EMAIL_HOST: any = process.env.EMAIL_HOST;
  const EMAIL_PORT: any = process.env.EMAIL_PORT;

  // STEP: CREATE TRANSPORTER
  let transporter;
  if (process.env.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADD,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  const html = pug.renderFile(`./views/email/sendFile.pug`, {
    firstName: options.firstName,
    subject: options.subject,
  });
  // STEP: DEFINE THE EMAIL OPTIONS
  const maillOption = {
    from: 'Lizz File server <fileserver@example.com>',
    to: options.email,
    subject: options.subject,
    html,
    attachments: [options.attachment],
  };

  //   STEP: SEND EMAIL
  await transporter.sendMail(maillOption);
};
