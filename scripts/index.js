const popup = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnClose = document.querySelector('.popup__btn-close');
const form = document.querySelector('.popup__form')

const name = document.querySelector('.profile__person-name');
const status = document.querySelector('.profile__person-status');
const nameValue = document.querySelector('.popup__input-line_type_name');
const statusValue = document.querySelector('.popup__input-line_type_status');

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
  e.preventDefault();
  name.textContent = nameValue.value;
  status.textContent = statusValue.value;  
  showEditMenu();
};

btnEdit.addEventListener('click', showEditMenu);
btnClose.addEventListener('click', showEditMenu);
form.addEventListener('submit', saveEdits);


