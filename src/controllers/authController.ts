import db from './../models';
import bcrypt from 'bcryptjs';

export const User = db.User;

// Hooks
User.beforeSave(async (user: any) => {
  if (!user.changed('password')) {
    return;
  }
  user.password = await bcrypt.hash(user.password, 12);
});

User.beforeSave(async (user: any) => {
  if (!user.changed('password')) {
    return;
  }
  user.passwordChangedAt = Date.now() - 1000;
});

// ROUTES HANDLERS
export const signup = async (req: any, res: any, next: any) => {
  try {
    console.log(req.body);
    const newUser = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: 'success',
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: error,
      },
    });
  }
};
