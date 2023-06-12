import axios from 'axios';
import { showAlert } from './alerts.js';

export const signin = async (email: string, password: string) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/auth/signin',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed in');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1500);
    }
  } catch (err: any) {
    showAlert('error', err.response.data.message);
    return 'error';
  }
};

export const signOut = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/auth/signout',
    });

    if ((res.data.status = 'success')) location.assign('/');
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};

export const searchFile = async (value: string, isAdmin: boolean) => {
  try {
    let res;

    if (isAdmin) {
      res = await axios({
        method: 'GET',
        url: `/api/file/num-of/downloads/email-sent/search/${value}`,
      });
    } else {
      res = await axios({
        method: 'GET',
        url: `/api/file/${value}`,
      });
    }

    if (res) {
      return res;
    }
  } catch (err) {
    showAlert('error', 'File does not exist');
    return "error";
  }
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string
) => {
  try {
    if (!(password == confirmPassword)) {
      showAlert('error', 'Passwords are not the same');
      return 'error';
    }

    const url = role === 'admin' ? '/auth/admin_signup' : '/auth/signup';
    const res = await axios({
      method: 'POST',
      url,
      data: {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      },
    });

    if (res.data.status === 'success') {
      localStorage.setItem('email', `${email}`);
      showAlert('success', 'Signed up');
      window.setTimeout(() => {
        location.assign('/verify-account');
      }, 1500);
    }
  } catch (err: any) {
    showAlert('error', err.response.data.message);
    return 'error';
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/auth/forgotPassword',
      data: {
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Instructions sent');

      window.setTimeout(() => {
        location.assign('/signin');
      }, 1500);
      return 'success';
    }
  } catch (err: any) {
    showAlert('error', 'User does not exist.');
    return 'error';
  }
};

export const downloadFile = async (filePath: string) => {
  try {
    const fileTitle = filePath.split('/')[2];
    const res = await axios({
      method: 'GET',
      url: `/api/file/download/${fileTitle}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'File downloaded');
    }
  } catch (err: any) {
    showAlert('error', err.response.data.message);
  }
};

export const uploadFile = async (data: any) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/file/upload-file`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'File uploaded');
      return 'success';
    }
  } catch (err: any) {
    showAlert('error', err.response.data.message);
    return 'error';
  }
};

export const passwordReset = async (
  password: string,
  passwordConfirm: string,
  token: string
) => {
  try {
    if (!(password === passwordConfirm)) {
      showAlert('error', 'Passwords are not the same');
      return 'error';
    }
    const res = await axios({
      method: 'PATCH',
      url: `/auth/password_reset/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password changed');
      window.setTimeout(() => {
        location.assign('/signin');
      }, 1500);
    }
  } catch (err: any) {
    showAlert('error', err.response.data.message);
    return 'error';
  }
};

export const sendEmail = async (recipient: string, file: string) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/email/send_file',
      data: {
        SentFileTo: recipient,
        document: file,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'File sent');
      return 'success';
    }
  } catch (err: any) {
    showAlert('error', err.response.data.message);
    return 'error';
  }
};
