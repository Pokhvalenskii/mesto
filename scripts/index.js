const popup = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnClose = document.querySelector('.popup__btn-close-image');
const form = document.querySelector('.popup__form')

const btnAdd = document.querySelector('.profile__btn-add');

const name = document.querySelector('.profile__person-name');
const status = document.querySelector('.profile__person-status');
const nameValue = document.querySelector('.popup__input-line_type_name');
const statusValue = document.querySelector('.popup__input-line_type_status');

const arrayCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function showEditMenu (Event) {

  const evtTarget = Event.target;
  console.log(evtTarget);

  switch(evtTarget) {
    case btnAdd:
      popup.classList.add('popup_active');
      console.log('Добавить');
      popup.querySelector('.popup__title').textContent = 'Новое место';
      popup.querySelector('.popup__btn-save').textContent = 'Создать';
      nameValue.value = '';
      statusValue.value = '';
      nameValue.setAttribute('placeholder', 'Название');
      statusValue.setAttribute('placeholder', 'Ссылка на картинку');
      break;
    case btnEdit:
      popup.classList.add('popup_active');
      console.log('Редактировать');
      popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
      popup.querySelector('.popup__btn-save').textContent = 'Сохранить';
      statusValue.value = status.textContent;
      nameValue.value = name.textContent;
      nameValue.setAttribute('placeholder', 'Имя');
      statusValue.setAttribute('placeholder', 'Должность');
      break;
    case btnClose:
      console.log('закрыть')
      popup.classList.remove('popup_active');
      break;
    case form:
      console.log('форма');
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
btnAdd.addEventListener('click', showEditMenu);

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

const cardTemplate = document.querySelector('#tempCard').content;
const cards = document.querySelector('.cards');

const showDefault = arrayCards.map(function(item){
  const card = cardTemplate.cloneNode(true);
  const cardText = card.querySelector('.card__text');
  const cardImage = card.querySelector('.card__image');
  cardText.textContent = item.name;
  cardImage.src = item.link;
  cards.append(card);
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// function addCard () {
//   if (popup.classList.contains('popup_active')){
//     popup.classList.remove('popup_active');
//   } else {
//     popup.classList.add('popup_active');
//     nameValue.value = name.textContent;
//     statusValue.value = status.textContent;
//   }
// }
lorem100  