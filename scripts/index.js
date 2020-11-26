const cardsArray = [
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
const popups = document.querySelectorAll('.popup');
const name = document.querySelector('.profile__person-name');
const status = document.querySelector('.profile__person-status');

const popupAdd = document.querySelector('.popup-add-card');
const submitAdd = popupAdd.querySelector('.popup__form');

const popupProfile = document.querySelector('.popup-profile');
const submitEdit = popupProfile.querySelector('.popup__form');

const closeButtons = document.querySelectorAll('.popup__btn-close');
const popupImg = document.querySelector('.popup-img');
const popupImgPicture = popupImg.querySelector('.popup-img__image')
const popupImgTitle = popupImg.querySelector('.popup-img__subtitle')
const profileName = popupProfile.querySelector('.popup__input_place_up');
const profileStatus = popupProfile.querySelector('.popup__input_place_down');
const placeTitle = popupAdd.querySelector('.popup__input_place_up');
const placeLink = popupAdd.querySelector('.popup__input_place_down');
const addCardSubmitButton = popupAdd.querySelector('.popup__btn-save');

let handleEsc;

btnEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  profileName.value = name.textContent;
  profileStatus.value = status.textContent;

});


btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

submitEdit.addEventListener('submit', (event) => {
  name.textContent = profileName.value;
  status.textContent = profileStatus.value;
  closePopup(popupProfile);
});

submitAdd.addEventListener('submit', (event) => {
  const placeUp = placeTitle.value;
  const placeDown = placeLink.value;
  const arrData = {name: placeUp, link: placeDown};
  addCard(createCard(arrData));
  submitAdd.reset();
  addCardSubmitButton.disabled = true;
  addCardSubmitButton.classList.remove('popup__btn-save_state_valid')
  addCardSubmitButton.classList.add('popup__btn-save_state_invalid')
  closePopup(popupAdd);
});

closeButtons.forEach((item)=>{
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
})

popups.forEach((popup) =>{
  popup.querySelector('.popup__overlay').addEventListener('click', () => {
    closePopup(popup);
  });
});

function openPopup (popup) {
  document.addEventListener('keydown', handleEsc = (evt) => escClose(evt, popup));
  popup.classList.add('popup_active');
}

function escClose (evt, popup) {
  if(evt.key === 'Escape') {
    closePopup(popup)
  }
}

function closePopup (popup) {
  document.removeEventListener('keydown', handleEsc)
  popup.classList.remove('popup_active');
}

const cards = cardsArray.map(createCard)
cards.forEach(addCard);

function createCard (item) {
  const tempCard = document.querySelector('#tempCard').content.cloneNode(true);
  const cardText = tempCard.querySelector('.card__text');
  const cardImage = tempCard.querySelector('.card__image');
  const like = tempCard.querySelector('.card__btn-like');
  const junk = tempCard.querySelector('.card__btn-remove');

  cardText.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardImage.addEventListener('click', (event) => {
    openPopup(popupImg);
    popupImgPicture.src = item.link;
    popupImgTitle.textContent = item.name;
  });

  like.addEventListener('click', (event) => {
    event.target.classList.toggle('card__btn-like_active');
  });

  junk.addEventListener('click', (event) => {
    event.target.closest('.card').remove();
  });

  return tempCard;
}

function addCard (item) {
  cardPlace.prepend(item);
}


