import catchAsync from '../utils/catchAsync';
import db from '../models';
import sendEmail from './../utils/email';
import nodemailer from 'nodemailer';
import AppError from './../utils/appError';
import path from 'path';

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

  const attachment = {
    filename: document,
    path: `./public/document/${document}`,
    cid:`${document}-${Date.now()}`
  };

  console.log('💥💥💥💥💥💥💥', {
    email: req.body.SentFileTo,
    subject: 'A DOCUMENT FROM LIZZ FILE SERVER',
    attachment,
  });

  await new sendEmail(user, "").sendFile();

  // await Email({
  //   email: req.body.SentFileTo,
  //   subject: 'A DOCUMENT FROM LIZZ FILE SERVER',
  //   attachment,
  // });

  // await db.Email.create({
  //   emailSentTo: to,
  //   FileId: file.id,
  // });

  res.status(201).json({
    status: 'success',
    message: 'File sent`',
  });
});

// const Email = async (options: any) => {
//   const EMAIL_HOST: any = process.env.EMAIL_HOST;
//   const EMAIL_PORT: any = process.env.EMAIL_PORT;

//   // STEP: CREATE TRANSPORTER
//   const transporter = nodemailer.createTransport({
//     host: EMAIL_HOST,
//     port: EMAIL_PORT,

//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   // STEP: DEFINE THE EMAIL OPTIONS
//   const maillOption = {
//     from: 'Lizz File server <fileserver@example.com>',
//     to: options.email,
//     subject: options.subject,
//     html: ,
//     attachments: [options.attachment],
//   };

//   //   STEP: SEND EMAIL
//   await transporter.sendMail(maillOption);
// };
