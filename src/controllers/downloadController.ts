import db from './../models';

export const downloadFile = async (req: any, res: any, next: any) => {
  const downloadedFile = await db.Download.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      downloadedFile,
    },
  });
};
