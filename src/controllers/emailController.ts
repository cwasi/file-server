import catchAsync from '../utils/catchAsync';
import db from '../models';

const Email = db.Email;
export const sendEmail = catchAsync(async (req: any, res: any, next: any) => {
  const newEmail = await Email.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newEmail,
    },
  });
});
