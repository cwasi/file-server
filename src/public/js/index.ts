import { signin, signOut } from './signin.js';

const signinForm = document.querySelector('.signin__form')!;
const signOutBtn = document.querySelector('.sign-out');

if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email')! as HTMLInputElement;
    const email = emailInput.value;
    const passwordInput = document.getElementById(
      'password'
    )! as HTMLInputElement;
    const password = passwordInput.value;
    signin(email, password);
  });
}

if (signOutBtn) signOutBtn.addEventListener('click', signOut);
