import {
  signin,
  signOut,
  searchFile,
  signup,
  forgotPassword,
  uploadFile,
  passwordReset,
  sendFile,
} from './action.js';
import capFirstLetter from '../utils/capFirstLetter';

const signupForm = document.querySelector('.signup__form')! as HTMLFormElement;
const signinForm = document.querySelector('.signin__form')! as HTMLFormElement;
const passwordResetForm = document.querySelector(
  '.reset__password__form'
)! as HTMLFormElement;
const forgorPasswordForm = document.querySelector(
  '.form__forgot-password'
)! as HTMLFormElement;
const emailForm = document.querySelector('.form__email')! as HTMLFormElement;
const AddFileForm = document.querySelector(
  '.form__add-file'
)! as HTMLFormElement;
const adminSeachForm = document.querySelector(
  '.search__form__admin'
)! as HTMLFormElement;
const signOutBtn = document.querySelector('.sign-out')! as HTMLButtonElement;
const searchForm = document.querySelector('.search__form')!;
const messageEmail = document.querySelector('.message__email')!;

if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email')! as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password'
    )! as HTMLInputElement;
    const email = emailInput.value.toLowerCase().trim();
    const password = passwordInput.value.toLowerCase().trim();
    signin(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name')! as HTMLInputElement;
    const emailInput = document.getElementById('email')! as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password'
    )! as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      'confirm_password'
    )! as HTMLInputElement;

    const name = nameInput.value.toLowerCase().trim();
    const email = emailInput.value.toLowerCase().trim();
    const password = passwordInput.value.toLowerCase().trim();
    const confirmPassword = confirmPasswordInput.value.toLowerCase().trim();
    const role = window.location.pathname.split('_')[0].slice(1);

    signup(name, email, password, confirmPassword, role);
    nameInput.value =
      emailInput.value =
      passwordInput.value =
      confirmPasswordInput.value =
        '';
  });
}

if (signOutBtn) signOutBtn.addEventListener('click', signOut);

if (searchForm) {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById(
      'search__input'
    )! as HTMLInputElement;

    const searchValue = searchInput.value.toLowerCase().trim();
    const doc = await searchFile(searchValue, false);
    renderFiles(doc, false);
  });
}
const fileInput = document.getElementById('uploadFile')! as HTMLInputElement;
const titleInput = document.getElementById('title')! as HTMLInputElement;

if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    const fileValue: any = fileInput.files;
    titleInput.value =
      fileValue[0]?.name === undefined ? '' : capFirstLetter(fileValue[0].name);
  });
}

if (AddFileForm) {
  AddFileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const descriptionInput = document.getElementById(
      'description'
    )! as HTMLInputElement;

    const titleValue = capFirstLetter(titleInput.value);
    const descriptionValue = capFirstLetter(descriptionInput.value);
    const fileValue: any = fileInput.files;

    fileValue[0].name.toLowerCase();

    const form = new FormData();
    form.append('file', fileValue[0]);
    form.append('title', titleValue);
    form.append('description', descriptionValue);

    uploadFile(form);
    titleInput.value = descriptionInput.value = fileInput.value = '';
  });
}

if (passwordResetForm) {
  passwordResetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById(
      'password'
    )! as HTMLInputElement;
    const passwordConfirmInput = document.getElementById(
      'passwordConfirm'
    )! as HTMLInputElement;

    const passwordValue = passwordInput.value.toLowerCase().trim();
    const passwordConfirmValue = passwordConfirmInput.value
      .toLowerCase()
      .trim();
    const token: any = window.location.pathname.split('/').pop();
    passwordReset(passwordValue, passwordConfirmValue, token);
  });
}

if (messageEmail) {
  messageEmail.textContent = localStorage.getItem('email');
  localStorage.removeItem('email');
}

if (forgorPasswordForm) {
  forgorPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email')! as HTMLInputElement;
    const email = emailInput.value.toLowerCase().trim();
    forgotPassword(email);
    emailInput.value = '';
  });
}

if (adminSeachForm) {
  adminSeachForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const isAdmin = true;
    const searchInput = document.getElementById(
      'search__input'
    )! as HTMLInputElement;

    const searchValue = searchInput.value.toLowerCase().trim();
    const doc = await searchFile(searchValue, isAdmin);
    renderFiles(doc, isAdmin);
  });
}
if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailToInput = document.getElementById(
      'email_to'
    )! as HTMLInputElement;
    const selectFileInput = document.getElementById(
      'filename'
    )! as HTMLInputElement;

    const emailToValue = emailToInput.value.toLowerCase().trim();
    const selectFileValue = selectFileInput.value;

    sendFile(emailToValue, selectFileValue);
  });
}

function renderFiles(doc: any, role: boolean) {
  let numOfDoc = document.querySelector('.num_of_doc')!;
  let tbody = document.querySelector('tbody')!;
  if (role) {
    const downloadsAndEmails =
      doc.data.data.getNumberOfFileDownloadsAndEmailSent;
    tbody.innerHTML = '';
    numOfDoc.textContent = downloadsAndEmails.length;

    downloadsAndEmails.forEach((el: any) => {
      const html: string = `
        <tr class="table__row">
              <td class="table__data">${el.title}</td>
              <td class="table__data">${el.numberOfEmailSent}</td>
              <td class="table__data">${el.numberOfFileDownloads}</td>
            </tr>`;
      tbody.insertAdjacentHTML('beforeend', html);
    });
  } else {
    const files = doc.data.data.files;

    tbody.innerHTML = '';
    numOfDoc.textContent = files.length;

    files.forEach((el: any) => {
      const html: string = `
    <tr class="table__row">
          <td class="table__data">${el.title}</td>
          <td class="table__data">
            <a href="/api/file/download/${el.title}">
                <img
                  src="/icon/icon-paper-download.svg"
                  alt="download file icon"
                />
            </a>
            </td>
        </tr>`;
      tbody.insertAdjacentHTML('beforeend', html);
    });
  }
}
