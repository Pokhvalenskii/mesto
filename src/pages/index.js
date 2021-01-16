import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
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
  profileStatus,
  popupImg,
  idCardTemplate
  } from '../utils/constants.js'

// const popupProfileClass = new Popup('.popup-profile');
// const popupAddClass = new Popup('.popup-add-card');
const popupWithImage = new PopupWithImage(popupImg); // popupImg = '.popup-img'

const validateAddCard = new FormValidator(submitAdd, cfgValidation);
const validateEditProfile = new FormValidator(submitEdit, cfgValidation);
const cardList = new Section({
  data: cardsArray,
  renderer: (item) => {
    const card = new Card(item, idCardTemplate, popupWithImage); //idCardTemplate = '#tempCard'
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.cards');

const popupWithFormAdd = new PopupWithForm('.popup-add-card', (data) => {
  const placeUp = data.data.name.value;
  const placeDown = data.data.link.value;
  const arrData = {name: placeUp, link: placeDown};
  // const popupWithImage = new PopupWithImage(arrData, '.popup-img');
  // const card = new Card(arrData, '#tempCard', popupWithImage);
  const card = createCard(arrData, '#tempCard', popupWithImage);

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

// cardList.initialCards();
cardList.renderer();
validateAddCard.enableValidation();
validateEditProfile.enableValidation();
popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();

btnEdit.addEventListener('click', () => {
  // popupProfileClass.open();
  const pop = new PopupWithForm('.popup-profile', () => {})
  pop.open()
  profileName.value = name.textContent;
  profileStatus.value = status.textContent;
});

btnAdd.addEventListener('click', () => {
  // popupAddClass.open();
  // const pop = openPopup('.popup-add-card');
  // pop.open();
  // popupWithFormAdd.open();
  // openPopup('.popup-add-card').open();
  const pop = new PopupWithForm('.popup-add-card', () => {})
  pop.open()
});


function createCard (data, selector, popup) {
  const card = new Card(data, selector, popup);
return card;
}

function openPopup(selector) {
const popup = new PopupWithForm(selector);
return popup
}
