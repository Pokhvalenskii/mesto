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

const cardPlace = document.querySelector('.cards');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const form = document.querySelectorAll('.popupform');
const name = document.querySelector('.profile__person-name');
const status = document.querySelector('.profile__person-status');
const popupAdd = document.querySelector('.popup-add-card');
const popupProfile = document.querySelector('.popup-profile');
const popupBtnClose = document.querySelectorAll('.popupbtn-close');
const popupImg = document.querySelector('.popup-img');
const popupSave = document.querySelectorAll('.popupbtn-save')

btnEdit.addEventListener('click', () => {

  popupOpen(popupProfile);
  popup.closest('.popup-profile').querySelector('.popupinput_place_up').value = name.textContent;
  popup.closest('.popup-profile').querySelector('.popupinput_place_down').value = status.textContent;
  // console.log('попап редактирования')
});

btnAdd.addEventListener('click', () => {
  popupOpen(popupAdd);
  // console.log('попап добавления')
});

// console.log(form)

popupSave.forEach((item) => {

  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    forma(item);
  })
})

function forma (item) {
  const popup = item.closest('.popup');
  const upPlace = popup.querySelector('.popupinput_place_up').value;
  const downPlace = popup.querySelector('.popupinput_place_down').value;
  // console.log('NODA: ', popup, ' VALUE-up: ', upPlace, ' VANUE-down: ', downPlace);

  if(popup.closest('.popup-profile')){
    name.textContent = upPlace;
    status.textContent = downPlace;
  }
  if(popup.closest('.popup-add-card')){
    // console.log('тут будем создавать карточку')
    const arrData = {name: upPlace, link: downPlace};
    // console.log(arrData);
    addCard(creatingCard(arrData));
  }
}

popupBtnClose.forEach((item)=>{
  item.addEventListener('click', () => {
    popups.forEach(popupClose);
    // console.log('закрыли попап')
  });
})

function popupOpen (popup) {
  popup.classList.add('popup_active');
}

function popupClose (popup) {
  popup.classList.remove('popup_active');
}

const card = arrayCards.map(creatingCard)
card.forEach(addCard);

function creatingCard (item) {
  const tempCard = document.querySelector('#tempCard').content.cloneNode(true);
  const cardText = tempCard.querySelector('.card__text');
  const cardImage = tempCard.querySelector('.card__image');
  const like = tempCard.querySelector('.card__btn-like');
  const junk = tempCard.querySelector('.card__btn-remove');

  cardText.textContent = item.name;
  cardImage.src = item.link;

  cardImage.addEventListener('click', (event) => {
    // console.log(event.target);
    popupOpen(popupImg);
    popupImg.querySelector('.popup-img__image').src = item.link;
    popupImg.querySelector('.popup-img__subtitle').textContent = item.name;
  });

  like.addEventListener('click', (event) => {
    // console.log('жмякнул лайк', event.target)
    event.target.classList.toggle('card__btn-like_active');
  });

  junk.addEventListener('click', (event) => {
    // console.log('Нажал на ведро');
    event.target.closest('.card').remove();
  });

  return tempCard;
}

function addCard (item) {
  cardPlace.prepend(item);
}

