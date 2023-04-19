import axios from 'axios';
import { showAlert } from './alerts.js';

export const signin = async (email, password) => {
  try {
    console.log(email, password);

    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:5050/auth/signin',
      data: {
        email,
        password,
      },
    });

    console.log(res);
    if (res.data.status === 'success') {
      console.log('login is true');
      showAlert('success', 'Signed in successfully!');
      // window.setTimeout(() => {
        //   location.assign('/');
        // }, 1500);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message)
    // showAlert('error', err.response.data.message);
  }
};
