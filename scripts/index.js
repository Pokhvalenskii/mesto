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


function showPopup (Event) {
  const evtTarget = Event.target;
  // console.log(evtTarget);

  if(evtTarget === btnAdd) {
    popup.classList.add('popup_active');
    console.log('Добавить');
    popup.querySelector('.popup__title').textContent = 'Новое место';
    popup.querySelector('.popup__btn-save').textContent = 'Создать';
    nameValue.value = '';
    statusValue.value = '';
    nameValue.setAttribute('placeholder', 'Название');
    statusValue.setAttribute('placeholder', 'Ссылка на картинку');
  }

  if(evtTarget === btnEdit) {
    popup.classList.add('popup_active');
    console.log('Редактировать');
    popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
    popup.querySelector('.popup__btn-save').textContent = 'Сохранить';
    statusValue.value = status.textContent;
    nameValue.value = name.textContent;
    nameValue.setAttribute('placeholder', 'Имя');
    statusValue.setAttribute('placeholder', 'Должность');
  }

  if(evtTarget === btnClose) {
    console.log('закрыть')
    popup.classList.remove('popup_active');
  }

  if(evtTarget === form) {
    console.log('форма');
    const choice = popup.querySelector('.popup__btn-save').textContent;
    console.log('Ответ от формы: ',choice);

    if(choice === 'Создать'){
      console.log('Добавляем карточку');
      addCard(nameValue.value, statusValue.value);

    } else if(choice === 'Сохранить'){
      console.log('Сохраняем форму редактирования');
      name.textContent = nameValue.value;
      status.textContent = statusValue.value;
    }
  }
};

function addCard (name, link) {

  if((name && link) !== '') {
    const card = cardTemplate.cloneNode(true);
    const cardText = card.querySelector('.card__text');
    const cardImage = card.querySelector('.card__image');
    cardText.textContent = name;
    cardImage.src = link;
    cards.append(card);
  } else {
    alert('Незьзя добавлять пустые поля');
  }
  // console.log(cardText, ' | ', cardImage);
}

function saveEdits (e) {
  e.preventDefault();
  showPopup(e);
};

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', showPopup);
form.addEventListener('submit', saveEdits);
btnAdd.addEventListener('click', showPopup);

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
