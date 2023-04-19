console.log('This is the index');

import { signin } from "./signin.js";

const signinForm = document.querySelector('.signin__form');

if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signin(email, password);
  });
}
