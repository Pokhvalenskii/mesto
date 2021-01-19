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
  idCardTemplate,
  cardsSelector,
  popupProfileSelector,
  popupAddCardSelector
  } from '../utils/constants.js'

const popupWithImage = new PopupWithImage(popupImg); // popupImg = '.popup-img'


const validateAddCard = new FormValidator(submitAdd, cfgValidation); // submitAdd  форма-редактирования

const validateEditProfile = new FormValidator(submitEdit, cfgValidation); // submitEdit  форма-добавления
const cardList = new Section({
  data: cardsArray,
  renderer: (item) => {
    const card = new Card(item, idCardTemplate, handlePopupImage); //idCardTemplate = '#tempCard'
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, cardsSelector); // cardsSelector = '.cards'

const popupWithFormAdd = new PopupWithForm(popupAddCardSelector, (data) => { //popupAddCardSelector = '.popup-add-card'
  const inputs = data // данные с наших полей ввода
  const placeUp = inputs.input1;
  const placeDown = inputs.input2;
  const arrData = {name: placeUp, link: placeDown};
  const card = createCard(arrData, idCardTemplate, handlePopupImage); //idCardTemplate = '#tempCard'

  const cardElement = card.createCard();
  cardList.addItem(cardElement);
  popupWithFormAdd.close();
});
const userInfo =  new UserInfo(name, status);

const popupWithFormEdit = new PopupWithForm(popupProfileSelector, (data) => { //popupProfileSelector = '.popup-profile'
  const inputs = data; // данные с наших полей ввода
  const profileName = inputs.input1;
  const profileStatus = inputs.input2
  userInfo.setUserInfo(profileName, profileStatus);
});

cardList.renderer();
validateAddCard.enableValidation();
validateEditProfile.enableValidation();
btnEdit.addEventListener('click', () => {
  popupWithFormEdit.open();
  validateEditProfile.clearErrors();
  popupWithFormEdit.setEventListeners();
  profileName.value = name.textContent;
  profileStatus.value = status.textContent;
});

btnAdd.addEventListener('click', () => {  
  popupWithFormAdd.open();
  validateAddCard.clearErrors();
  popupWithFormAdd.setEventListeners();
});

function createCard (data, selector, popup) {
  const card = new Card(data, selector, popup);
return card;
}

function handlePopupImage (a, b) {
  popupWithImage.open(a,b)
  popupWithImage.setEventListeners();
}

