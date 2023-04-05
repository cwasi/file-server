// import User from './../models/userModel';
import db from './../models';

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
