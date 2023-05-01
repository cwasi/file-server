import axios from 'axios';
import { showAlert } from './alerts.js';

export const signin = async (email: string, password: string) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:5050/auth/signin',
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
      url: 'http://127.0.0.1:5050/auth/signout',
    });

    if ((res.data.status = 'success')) location.assign('/');
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
