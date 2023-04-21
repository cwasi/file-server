export const getWelcomePage = (req: any, res: any, next: any) => {
  res.status(200).render({});
};
export const getHomePage = (req: any, res: any, next: any) => {
  res.status(200).render('home', {
    title: 'Home',
  });
};

export const getSignupPage = (req: any, res: any, next: any) => {
  res.status(200).render('signup', {
    title: 'Sign up',
  });
};

export const getSigninPage = (req: any, res: any, next: any) => {
  res.status(200).render('signin', {
    title: 'Sign in',
  });
};
export const getSendResetPasswordLinkPage = (req: any, res: any, next: any) => {
  res.status(200).render('sendResetPasswordLink', {
    title: 'Send reset password link',
  });
};
export const getResetPasswordPage = (req: any, res: any, next: any) => {
  res.status(200).render('resetPassword', {
    title: 'Reset password',
  });
};
