import {
  signin,
  signOut,
  searchFile,
  signup,
  forgotPassword,
  uploadFile,
} from './action.js';

const signupForm = document.querySelector('.signup__form')! as HTMLFormElement;
const signinForm = document.querySelector('.signin__form')! as HTMLFormElement;
const resetPassworForm = document.querySelector(
  '.reset__password__form'
)! as HTMLFormElement;
const forgorPasswordForm = document.querySelector(
  '.form__forgot-password'
)! as HTMLFormElement;
const emailForm = document.querySelector('.form__email')! as HTMLFormElement;
const AddFileForm = document.querySelector(
  '.form__add-file'
)! as HTMLFormElement;
const signOutBtn = document.querySelector('.sign-out')! as HTMLButtonElement;
const searchForm = document.querySelector('.search__form')!;
const inputs = document.querySelectorAll('.form__otp__input')!;
const btnVerify = document.querySelector('.btn__verify')!;
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
    const doc = await searchFile(searchValue);
    renderFiles(doc);
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
    form.append('uploadFile', fileValue[0]);
    form.append('title', titleValue);
    form.append('description', descriptionValue);

    uploadFile(form);
  });
}

if (resetPassworForm) {
  resetPassworForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Reset Password Form was submited');
  });
}

if (inputs && btnVerify) {
  optFormActions(inputs);

  btnVerify.addEventListener('click', (e) => {
    e.preventDefault();
    let verificationCode: any = [];
    inputs.forEach((el: any) => {
      verificationCode.push(el.value);
    });
    verificationCode = verificationCode.join('');
    console.log(verificationCode);
  });
}

// if (downloadTable) {
//   downloadTable.addEventListener('click', (e) => {
//     e.preventDefault();
//     const el: any = e.target;
//     const parentEl = el.parentNode;
//     const filePath = parentEl.getAttribute('data-file');
//     downloadFile(filePath)
//   });
// }

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

if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('email form clicked');
    console.log('email form');
    const emailTo = document.getElementById('email_to')! as HTMLInputElement;
    const emailForm = document.getElementById(
      'email_from'
    )! as HTMLInputElement;
    const emailSubject = document.getElementById(
      'email_subject'
    )! as HTMLInputElement;
    // const  = document.getElementById('')! as HTMLInputElement;
    const emailMessage = document.getElementById(
      'email_message'
    )! as HTMLInputElement;
    const emailFile = document.getElementById(
      'email_File'
    )! as HTMLInputElement;

    const emailToValue = emailTo.value;
    const emailToFormValue = emailForm.value;
    const emailSubjectValue = emailSubject.value;
    const emailMessageValue = emailMessage.value;
    const emailFileValue = emailFile.value;
  });
}

function optFormActions(inputs: any) {
  inputs.forEach((input: any, index1: any) => {
    input.addEventListener('keyup', (e: any) => {
      // This code gets the current input element and stores it in the currentInput variable
      // This code gets the next sibling element of the current input element and stores it in the nextInput variable
      // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
      const currentInput = input,
        nextInput = input.nextElementSibling,
        prevInput = input.previousElementSibling;

      // if the value has more than one character then clear it
      if (currentInput.value.length > 1) {
        currentInput.value = '';
        return;
      }
      // if the next input is disabled and the current value is not empty
      //  enable the next input and focus on it
      if (
        nextInput &&
        nextInput.hasAttribute('disabled') &&
        currentInput.value !== ''
      ) {
        nextInput.removeAttribute('disabled');
        nextInput.focus();
      }

      // if the backspace key is pressed
      if (e.key === 'Backspace') {
        // iterate over all inputs again
        inputs.forEach((input: any, index2: any) => {
          // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
          // and the previous element exists, set the disabled attribute on the input and focus on the previous element
          if (index1 <= index2 && prevInput) {
            input.setAttribute('disabled', true);
            input.value = '';
            prevInput.focus();
          }
        });
      }
      //if the fourth input( which index number is 3) is not empty and has not disable attribute then
      //add active class if not then remove the active class.
      if (!inputs[5].disabled && inputs[5].value !== '') {
        btnVerify.classList.add('active');
        return;
      }
      btnVerify.classList.remove('active');
    });
  });

  window.addEventListener('load', () => inputs[0].focus());
}

function renderFiles(doc: any) {
  const files = doc.data.data.files;
  const numOfDoc = document.querySelector('.num_of_doc')!;
  const tbody = document.querySelector('tbody')!;
  tbody.innerHTML = '';
  numOfDoc.textContent = files.length;

  files.forEach((el: any) => {
    const html: any = `
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
