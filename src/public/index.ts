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
    const email = emailInput.value;
    const passwordInput = document.getElementById(
      'password'
    )! as HTMLInputElement;
    const password = passwordInput.value;
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

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    signup(name, email, password, confirmPassword);
  });
}

if (signOutBtn) signOutBtn.addEventListener('click', signOut);

if (searchForm) {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById(
      'search__input'
    )! as HTMLInputElement;

    const searchValue = searchInput.value.trim();
    const doc = await searchFile(searchValue, false);
    renderFiles(doc, false);
  });
}

if (AddFileForm) {
  AddFileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('title')! as HTMLInputElement;
    const descriptionInput = document.getElementById(
      'description'
    )! as HTMLInputElement;
    const fileInput = document.getElementById(
      'uploadFile'
    )! as HTMLInputElement;

    const titleValue = titleInput.value;
    const descriptionValue = descriptionInput.value;
    const fileValue: any = fileInput.files;

    const form = new FormData();
    form.append('file', fileValue[0]);
    form.append('title', titleValue);
    form.append('description', descriptionValue);

    uploadFile(form);
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

    const passwordValue = passwordInput.value.trim();
    const passwordConfirmValue = passwordConfirmInput.value.trim();
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
    const email = emailInput.value;
    forgotPassword(email);
  });
}

if (adminSeachForm) {
  adminSeachForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const isAdmin = true;
    const searchInput = document.getElementById(
      'search__input'
    )! as HTMLInputElement;

    const searchValue = searchInput.value;
    const doc = await searchFile(searchValue, isAdmin);
    renderFiles(doc, isAdmin);
  });
}
if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailTo = document.getElementById('email_to')! as HTMLInputElement;
    const searchFileInput = document.getElementById(
      'filename'
    )! as HTMLInputElement;

    const emailToValue = emailTo.value;
    const searchValue = searchFileInput.value;

    sendFile(emailToValue, searchValue);
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
