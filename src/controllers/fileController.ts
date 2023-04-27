import multer from 'multer';
import { promisify } from 'util';
import catchAsync from '../utils/catchAsync';
import db from './../models';

const File = db.File;
const Download = db.Download;
const Email = db.Email;

// const multerStorage = multer.diskStorage({
//   destination: (req: any, file: any, cb: any) => {
//     cb(null, 'public/document');
//   },

//   filename: (req: any, file: any, cb: any) => {},
// });

// const upload = multer({
//   storage: multerStorage,
// });

// export const uploadFile = upload.single('uploaded_file');

export const uploadFile = catchAsync(
  async (req: any, res: any, next: any) => {
    console.log('here in document');
    console.log(req.body);
    console.log('😍😍😍😍', req.file);
    res.status(200).json({
      status: 'success',
    });
  }
);

export const createfile = async (req: any, res: any, next: any) => {
  console.log(req.body);
  const newFile = await File.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      newFile,
    },
  });
};

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
