import {
  signin,
  signOut,
  searchFile,
  signup,
  forgotPassword,
  uploadFile,
  passwordReset,
  sendEmail,
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
const uploadFileForm = document.querySelector(
  '.form__add-file'
)! as HTMLFormElement;
const signOutBtn = document.querySelector('.sign-out')! as HTMLButtonElement;
const searchForm = document.querySelector('.search__form')!;
const messageEmail = document.querySelector('.message__email')!;

const showLoader = (el: HTMLElement) => {
  const loader = `<div class="loader"><div>`;
  el.innerHTML = loader;
};
const hideLoader = (el: HTMLElement, innerHtml: string) => {
  el.innerHTML = innerHtml;
};

if (signinForm) {
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email')! as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password'
    )! as HTMLInputElement;
    const btnSubmit = document.getElementById('submit')! as HTMLButtonElement;

    const email = emailInput.value.toLowerCase().trim();
    const password = passwordInput.value.toLowerCase().trim();
    const btnInnerHTML = btnSubmit.innerHTML;
    showLoader(btnSubmit);
    const res = await signin(email, password);
    if (res === 'error') {
      hideLoader(btnSubmit, btnInnerHTML);
    }
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name')! as HTMLInputElement;
    const emailInput = document.getElementById('email')! as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password'
    )! as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      'confirm_password'
    )! as HTMLInputElement;
    const btnSubmit = document.getElementById('submit')! as HTMLButtonElement;

    const name = nameInput.value.toLowerCase().trim();
    const email = emailInput.value.toLowerCase().trim();
    const password = passwordInput.value.toLowerCase().trim();
    const confirmPassword = confirmPasswordInput.value.toLowerCase().trim();
    const role = window.location.pathname.split('_')[0].slice(1);
    const btnInnerHTML = btnSubmit.innerHTML;

    showLoader(btnSubmit);
    const res = await signup(name, email, password, confirmPassword, role);
    if (res === 'error') {
      hideLoader(btnSubmit, btnInnerHTML);
    }
  });
}

if (signOutBtn) signOutBtn.addEventListener('click', signOut);

if (searchForm) {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById(
      'search__input'
    )! as HTMLInputElement;
    const btnSubmit = document.getElementById('submit')! as HTMLButtonElement;

    const role = searchForm.getAttribute('data-role');
    const isAdmin = role === 'admin' ? true : false;

    const searchValue = capFirstLetter(searchInput.value);
    showLoader(btnSubmit);
    const doc = await searchFile(searchValue, isAdmin);
    if (doc) {
      hideLoader(btnSubmit, 'Search');
      renderFiles(doc, isAdmin);
    }
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

if (uploadFileForm) {
  uploadFileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const descriptionInput = document.getElementById(
      'description'
    )! as HTMLInputElement;
    const btnSubmit = document.getElementById('submit')! as HTMLButtonElement;

    const titleValue = capFirstLetter(titleInput.value);
    const descriptionValue = capFirstLetter(descriptionInput.value);
    const fileValue: any = fileInput.files;

    fileValue[0].name.toLowerCase();

    const form = new FormData();
    form.append('file', fileValue[0]);
    form.append('title', titleValue);
    form.append('description', descriptionValue);
    showLoader(btnSubmit);
    const res = await uploadFile(form);
    if (res) {
      titleInput.value = descriptionInput.value = fileInput.value = '';
      hideLoader(btnSubmit, 'Upload');
    }
  });
}

if (passwordResetForm) {
  passwordResetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById(
      'password'
    )! as HTMLInputElement;
    const passwordConfirmInput = document.getElementById(
      'passwordConfirm'
    )! as HTMLInputElement;
    const btnSubmit = document.getElementById('submit')! as HTMLButtonElement;

    const passwordValue = passwordInput.value.toLowerCase().trim();
    const passwordConfirmValue = passwordConfirmInput.value
      .toLowerCase()
      .trim();
    const token: any = window.location.pathname.split('/').pop();
    showLoader(btnSubmit);
    const res = await passwordReset(passwordValue, passwordConfirmValue, token);
    if (res) {
      hideLoader(btnSubmit, 'Set new password');
    }
  });
}

if (messageEmail) {
  messageEmail.textContent = localStorage.getItem('email');
  localStorage.removeItem('email');
}

if (forgorPasswordForm) {
  forgorPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email')! as HTMLInputElement;
    const email = emailInput.value.toLowerCase().trim();
    const btnSubmit = document.getElementById('submit')! as HTMLButtonElement;

    showLoader(btnSubmit);
    const res = await forgotPassword(email);
    if (res) {
      emailInput.value = '';
      hideLoader(btnSubmit, 'Send Instructions');
    }
  });
}


if (emailForm) {
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailToInput = document.getElementById(
      'email_to'
    )! as HTMLInputElement;
    const selectFileInput = document.getElementById(
      'filename'
    )! as HTMLInputElement;
    const btnSubmit = document.getElementById('submit')! as HTMLButtonElement;

    const emailToValue = emailToInput.value.toLowerCase().trim();
    const selectFileValue = selectFileInput.value;

    showLoader(btnSubmit);
    const res = await sendEmail(emailToValue, selectFileValue);
    if (res) {
      hideLoader(btnSubmit, 'Send');
    }
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
        <tr class="admin__table__row">
              <td class="admin__table__data">${el.title}</td>
              <td class="admin__table__data">${el.numberOfEmailSent}</td>
              <td class="admin__table__data">${el.numberOfFileDownloads}</td>
            </tr>`;
      tbody.insertAdjacentHTML('beforeend', html);
    });
  } else {
    const files = doc.data.data.files;

    tbody.innerHTML = '';
    numOfDoc.textContent = files.length;

    files.forEach((el: any) => {
      const html: string = `
    <tr class="user__table__row">
          <td class="user__table__data">${el.title}</td>
          <td class="user__table__data">${el.description}</td>
          <td class="user__table__data">
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
