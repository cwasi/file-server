import multer from 'multer';
import catchAsync from '../utils/catchAsync';
import db from './../models';
import AppError from './../utils/appError';

const File = db.File;
const Download = db.Download;
const Email = db.Email;

const multerStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, './assets/document');
  },
});

const upload = multer({ storage: multerStorage });

export const uploadFile = upload.single('uploadFile');

export const saveFile = catchAsync(async (req: any, res: any, next: any) => {
  if (!req.file) {
    return next(new AppError('Please upload a file', 401));
  }

  const duplicatFileName = await File.findOne({
    where: { title: req.body.title },
  });

  if (duplicatFileName) {
    return next(
      new AppError('File name already exist. Please try another file name', 401)
    );
  }

  const fileObj = {
    title: req.body.title,
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

export const numOfdownloadAndEmails = catchAsync(
  async (req: any, res: any, next: any) => {
    // Get the ids
    const query = await File.findAll();
    const getNumOfdownloadfile = [];
    for (let i = 0; i < query.length; i++) {
      const element = query[i];
      const fileTile = element.file;
      const numberOfDownloads = await element.countDownloads();
      getNumOfdownloadfile.push({ fileTile, numberOfDownloads });
    }

    res.status(200).json({
      status: 'success',
      data: {
        getNumOfdownloadfile,
      },
    });
  }
);
