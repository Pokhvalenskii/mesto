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
  popupAddCardSelector,
  popupDeleteCardSelector,
  } from '../utils/constants.js'
import DeletePopup from '../components/DeletePopup';

const popupWithImage = new PopupWithImage(popupImg); // popupImg = '.popup-img'
const validateAddCard = new FormValidator(submitAdd, cfgValidation); // submitAdd  форма-редактирования
const validateEditProfile = new FormValidator(submitEdit, cfgValidation); // submitEdit  форма-добавления

const cardList = new Section({
  data: cardsArray,
  renderer: (item) => {
    const card = createCard(item, idCardTemplate, handlePopupImage, test); //idCardTemplate = '#tempCard'
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, cardsSelector); // cardsSelector = '.cards'


const popupWithFormAdd = new PopupWithForm(popupAddCardSelector, (data) => { //popupAddCardSelector = '.popup-add-card'
  const arrData = {name: data.cardName, link: data.cardLink}; //arrData объект с именем и ссылкой
  const card = createCard(arrData, idCardTemplate, handlePopupImage, test); //idCardTemplate = '#tempCard'
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
  popupWithFormAdd.close();
});
const userInfo =  new UserInfo(name, status);

const popupWithFormEdit = new PopupWithForm(popupProfileSelector, (data) => { //popupProfileSelector = '.popup-profile'
  const profileName = data.person_name;
  const profileStatus = data.person_status;
  userInfo.setUserInfo(profileName, profileStatus);
});

cardList.renderer();
validateAddCard.enableValidation();
validateEditProfile.enableValidation();

btnEdit.addEventListener('click', () => {
  profileName.value = name.textContent;
  profileStatus.value = status.textContent;
  popupWithFormEdit.open();
  validateEditProfile.clearErrors();
  popupWithFormEdit.setEventListeners();

});

btnAdd.addEventListener('click', () => {
  popupWithFormAdd.open();
  validateAddCard.clearErrors();
  popupWithFormAdd.setEventListeners();
});

function createCard (data, selector, popup, test) {
  const card = new Card(data, selector, popup, test);
  return card;
}

function handlePopupImage (link, name) {
  popupWithImage.open(link, name);
  popupWithImage.setEventListeners();
}
let eventSet;
function test (card) {
  console.log(card);

  const deletePopup = new DeletePopup(card, popupDeleteCardSelector);

  deletePopup.setEventListeners();
  deletePopup.open();
}



