import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {cardsArray} from './initial-сards.js';



const cfgValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidSelector: 'popup__input_status_invalid',
  submitSelector: '.popup__btn-save',
  submitInvalidSelector: '.popup__btn-save_status_invalid',
  submitStateInvalidSelector: 'popup__btn-save_state_invalid',
  submitStateValidSelector: 'popup__btn-save_state_valid'
};

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

const validateAddCard = new FormValidator(submitAdd, cfgValidation);
const validateEditProfile = new FormValidator(submitEdit, cfgValidation);

validateAddCard.enableValid();
validateEditProfile.enableValid();


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

  const card = new Card(arrData, '#tempCard', openPopupImage);
  const cardElement = card.createCard();
  addCard(cardElement);

  submitAdd.reset();
  addCardSubmitButton.disabled = true;
  addCardSubmitButton.classList.remove(cfgValidation.submitStateValidSelector);
  addCardSubmitButton.classList.add(cfgValidation.submitStateInvalidSelector);
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

cardsArray.forEach((item) => {
  const card = new Card(item, '#tempCard', openPopupImage);
  const cardElement = card.createCard();
  addCard(cardElement);
});

function addCard (item) {
  cardPlace.prepend(item);
}

function openPopupImage (link, name) {
  openPopup(popupImg);
  popupImgPicture.src = link;
  popupImgTitle.textContent = name;
}






