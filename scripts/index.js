const popup = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnClose = document.querySelector('.popup__btn-close');
const btnSave = document.querySelector('.popup__btn-save');
const form = document.querySelector('.popup__form')

const name = document.querySelector('.profile__person-name');
const status = document.querySelector('.profile__person-status');
const nameValue = document.querySelector('.popup__person-name');
const statusValue = document.querySelector('.popup__person-status');

console.log (name.textContent);

function showEditMenu () {
  if (popup.classList.contains('popup_active')){
    popup.classList.remove('popup_active');
  } else {
    popup.classList.add('popup_active');
    nameValue.value = name.textContent;
    statusValue.value = status.textContent;
  }
};

function saveEdits (e) {
  name.textContent = nameValue.value;
  status.textContent = statusValue.value;
  e.preventDefault();
};

btnEdit.addEventListener('click', showEditMenu);
btnClose.addEventListener('click', showEditMenu);
btnSave.addEventListener('click', saveEdits);
form.addEventListener('submit', saveEdits);


