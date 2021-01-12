import './../src/pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
  cfgValidation,
  cardsArray,
  btnEdit,
  btnAdd,
  name,
  status,
  submitAdd,
  submitEdit,
  profileName,
  profileStatus
  } from './constants.js'

const popupProfileClass = new Popup('.popup-profile');
const popupAddClass = new Popup('.popup-add-card');
const validateAddCard = new FormValidator(submitAdd, cfgValidation);
const validateEditProfile = new FormValidator(submitEdit, cfgValidation);
const cardList = new Section({
  data: cardsArray,
  renderer: (item) => {
    const popupWithImage = new PopupWithImage(item, '.popup-img');
    const card = new Card(item, '#tempCard', popupWithImage);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.cards');

const popupWithFormAdd = new PopupWithForm('.popup-add-card', (data) => {
  const placeUp = data.data.name.value;
  const placeDown = data.data.link.value;
  const arrData = {name: placeUp, link: placeDown};
  const popupWithImage = new PopupWithImage(arrData, '.popup-img');
  const card = new Card(arrData, '#tempCard', popupWithImage);
  const cardElement = card.createCard();
  cardList.addItem(cardElement);

  const form = data.popup.querySelector('.popup__form');
  form.reset();
  const submitBtn = form.querySelector('.popup__btn-save');
  submitBtn.disabled = true;
  submitBtn.classList.remove(cfgValidation.submitStateValidSelector);
  submitBtn.classList.add(cfgValidation.submitStateInvalidSelector);
});

const userData = {name, status};
const userInfo =  new UserInfo(userData)

const popupWithFormEdit = new PopupWithForm('.popup-profile', (data) => {
  const profileName = data.popup.querySelector('.popup__input_place_up');
  const profileStatus = data.popup.querySelector('.popup__input_place_down');
  userInfo.setUserInfo(profileName, profileStatus);
});

cardList.initialCards();
validateAddCard.enableValidation();
validateEditProfile.enableValidation();
popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();

btnEdit.addEventListener('click', () => {
  popupProfileClass.open();
  profileName.value = name.textContent;
  profileStatus.value = status.textContent;
});

btnAdd.addEventListener('click', () => {
  popupAddClass.open();
});




