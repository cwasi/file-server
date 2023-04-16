import db from './../models';

export const createfile = async (req: any, res: any, next: any) => {
  console.log(req.body);
  const newFile = await db.File.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      newFile,
    },
  });
};

export const getAllfiles = async (req: any, res: any, next: any) => {
  const files = await db.File.findAll();

  res.status(200).json({
    status: 'success',
    data: { files },
  });
};
