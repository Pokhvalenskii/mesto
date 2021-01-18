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

const popupWithImage = new PopupWithImage(popupImg); // popupImg = '.popup-img'
const validateAddCard = new FormValidator(submitAdd, cfgValidation); // submitAdd  форма-редактирования
const validateEditProfile = new FormValidator(submitEdit, cfgValidation); // submitEdit  форма-добавления
const cardList = new Section({
  data: cardsArray,
  renderer: (item) => {
    const card = new Card(item, idCardTemplate, popupWithImage); //idCardTemplate = '#tempCard'
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.cards');
const popupWithFormAdd = new PopupWithForm('.popup-add-card', (data) => {
  const inputs = data.querySelectorAll('.popup__input');
  const placeUp = inputs[0].value
  const placeDown = inputs[1].value
  const arrData = {name: placeUp, link: placeDown};
  const card = createCard(arrData, idCardTemplate, popupWithImage); //idCardTemplate = '#tempCard'

  const cardElement = card.createCard();
  cardList.addItem(cardElement);
  data.reset();
  const submitBtn = data.querySelector('.popup__btn-save');

  submitBtn.disabled = true;
  submitBtn.classList.remove(cfgValidation.submitStateValidSelector);
  submitBtn.classList.add(cfgValidation.submitStateInvalidSelector);
});
const userInfo =  new UserInfo(name, status)
const popupWithFormEdit = new PopupWithForm('.popup-profile', (data) => {
  const inputs = data.querySelectorAll('.popup__input');
  const profileName = inputs[0];
  const profileStatus = inputs[1]
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


