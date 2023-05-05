import catchAsync from '../utils/catchAsync';
import db from './../models';
import AppError from './../utils/appError';

export const downloadFile = catchAsync(
  async (req: any, res: any, next: any) => {
    const file = await db.File.findOne({
      where: { title: req.params.filetitle },
    });

    if (!file) {
      return next(new AppError('File does not exist', 401));
    }

    await db.Download.create({ downloadedBy: req.user.name, FileId: file.id });

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${req.params.filetitle}`
    );

    res.download(`./public/document/${req.params.filetitle}`);
  }
);

export const countNumberOfFileDownload = catchAsync(
  async (req: any, res: any, next: any) => {
    const query = await db.Download.findByPk(
      '6daab7cf-ea4c-4bfd-ab67-55114b01dd5b'
    );
    const fileId = query.FileId;
    const numberofFileDownloads = await db.Download.findAll({
      where: { FileId: fileId },
    });

    res.status(200).json({
      status: 'success',
      result: numberofFileDownloads.length,
      data: { numberofFileDownloads },
    });
    next();
  }
);

export const getAllDownloads = catchAsync(
  async (req: any, res: any, next: any) => {
    const allDownloads = await db.Download.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        allDownloads,
      },
    });
  }
);
