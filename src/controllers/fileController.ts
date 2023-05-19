import multer from 'multer';
import { Op } from 'sequelize';
import catchAsync from '../utils/catchAsync';
import db from './../models';
import AppError from './../utils/appError';

const File = db.File;
const Download = db.Download;
const Email = db.Email;

const multerStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, './public/document');
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: multerStorage });

export const uploadFile = upload.single('file');

export const saveFile = catchAsync(async (req: any, res: any, next: any) => {
  if (!req.file) {
    return next(new AppError('Please upload a file', 401));
  }

  console.log('🍍🍍🍍🍍', req.file);

  const duplicatFileName = await File.findOne({
    where: { title: req.file.originalname },
  });

  if (duplicatFileName) {
    return next(
      new AppError('File name already exist. Please try another file name', 401)
    );
  }

  const fileObj = {
    title: req.file.originalname,
    description: req.body.description,
  };

  const newFile = await File.create(fileObj);

  res.status(200).json({
    status: 'success',
    data: { newFile },
  });
});

export const getAllfiles = async (req: any, res: any, next: any) => {
  const files = await File.findAll();

  res.status(200).json({
    status: 'success',
    data: { files },
  });
};

export const getFile = catchAsync(async (req: any, res: any, next: any) => {
  const doc = req.params.slug;
  const files = await File.findAll({
    where: { slug: { [Op.startsWith]: doc } },
  });

  if (!files) {
    return next(new AppError('No document found with that name', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { files },
  });
});

export const numOfdownloadAndEmails = catchAsync(
  async (req: any, res: any, next: any) => {
    // Get the ids
    let files;
    
    if (req.params.file) {
      files = await File.findAll({
        where: { slug: { [Op.startsWith]: req.params.file } },
      });
    } else {
      files = await File.findAll();
    }
    const getNumberOfFileDownloadsAndEmailSent = [];

    for (let i = 0; i < files.length; i++) {
      const numberOfFileDownloads = await files[i].countDownloads();
      const numberOfEmailSent = await files[i].countEmails();

      getNumberOfFileDownloadsAndEmailSent.push({
        title: files[i].title,
        numberOfFileDownloads,
        numberOfEmailSent,
      });
    }
    res.locals.downloadsAndEmails = getNumberOfFileDownloadsAndEmailSent;
    res.status(200).json({
      status: 'success',
      data: {
        getNumberOfFileDownloadsAndEmailSent,
      },
    });
  }
);
