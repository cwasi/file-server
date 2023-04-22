import { signin, signOut } from './signin.js';

const signinForm = document.querySelector('.signin__form');
const signOutBtn = document.querySelector('.sign-out');

if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signin(email, password);
  });
}

if(signOutBtn) signOutBtn.addEventListener("click", signOut)
