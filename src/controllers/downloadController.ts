import catchAsync from '../utils/catchAsync';
import db from './../models';


export const downloadFile = async (req: any, res: any, next: any) => {
  const fileId = req.params.fileId;

  // const downloadedFile = await db.Download.create({
  //   downloadedBy: req.body.downloadedBy,
  //   FileId: fileId,
  // });

  res.status(200).json({
    status: 'success',
    data: {
      // downloadedFile,
    },
  });
};

export const countNumberOfFileDownload = catchAsync(
  async (req: any, res: any, next: any) => {
    const query = await db.Download.findByPk(
      '6daab7cf-ea4c-4bfd-ab67-55114b01dd5b'
    );
    const fileId = query.FileId;
    console.log('🍌🍌🍌🍌', fileId);

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
    // const allDownloads = await db.Download.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        // allDownloads,
      },
    });
  }
);
