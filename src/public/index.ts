import { signin, signOut, searchFile } from './action.js';

const signinForm = document.querySelector('.signin__form')! as HTMLFormElement;
const signOutBtn = document.querySelector('.sign-out')! as HTMLButtonElement;
const searchForm = document.querySelector('.search__form')!;

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
            <button class="download-btn">
            <a href='/document/${el.title}' download>
              <img
                src="/icon/icon-paper-download.svg"
                alt="download file icon"
              />
              </a>
            </button>
            </td>
        </tr>`;
    tbody.insertAdjacentHTML('beforeend', html);
  });
}
if (signOutBtn) signOutBtn.addEventListener('click', signOut);
