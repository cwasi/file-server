import { signin, signOut} from './action.js';

const signinForm = document.querySelector('.signin__form')! as HTMLFormElement;
const signOutBtn = document.querySelector('.sign-out')! as HTMLButtonElement;

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
