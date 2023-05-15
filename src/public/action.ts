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
      showAlert('success', 'Signed in successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1500);
    }
  } catch (err: any) {
    showAlert('error', err.response.data.message);
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

export const searchFile = async (value: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/file/${value}`,
    });

    if (res) {
      return res;
    }
  } catch (err) {
    showAlert('error', 'File does not exist');
  }
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    if (!(password == confirmPassword)) {
      return showAlert('error', 'Passwords are not the same');
    }
    const res = await axios({
      method: 'POST',
      url: '/auth/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      },
    });

    if (res.data.status === 'success') {
      localStorage.setItem('email', `${email}`);
      showAlert('success', 'signed up successfully');
      window.setTimeout(() => {
        location.assign('/sendVerificationLink');
      }, 1500);
    }
  } catch (err: any) {
    console.log('💥💥💥', err);
    console.log('💥💥💥', err.response.data.stack);
    showAlert('error', err.response.data.message);
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
      showAlert('success', 'Link sent successfully');

      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err: any) {
    showAlert('error', 'User does not exist.');
  }
};

export const downloadFile = async (filePath: string) => {
  try {
    const fileTitle = filePath.split('/')[2];
    const res = await axios({
      method: 'GET',
      url: `/api/file/download/${fileTitle}`,
    });

    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'successfully');
    }

    console.log(filePath);
  } catch (err: any) {
    console.log(err);
  }
};

export const uploadFile = async (data: any) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/file/upload-file`,
      data,
    });

    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'successfull');
    }
  } catch (err: any) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
