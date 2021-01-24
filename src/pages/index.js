import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import CardSection from '../components/CardSection.js';

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
  profileAvatarBtn,
  profileAvatarSelector,
  submitAvatar,
  } from '../utils/constants.js'
import DeletePopup from '../components/DeletePopup';

const popupWithImage = new PopupWithImage(popupImg); // popupImg = '.popup-img'
const validateAddCard = new FormValidator(submitAdd, cfgValidation); // submitAdd  форма-редактирования
const validateEditProfile = new FormValidator(submitEdit, cfgValidation); // submitEdit  форма-добавления
const validateEditAvatar = new FormValidator(submitAvatar, cfgValidation);

const api = new Api({
  urlApi: 'https://mesto.nomoreparties.co/v1/',
  token: '8675e632-7ad1-4f28-9202-69cb55994239',
  groupId: 'cohort-19'
})

const popupAvatarEdit = new PopupWithForm (profileAvatarSelector, (data) => {
  // console.log(data.ImageLink);
  api.editAvatar(data.ImageLink);
  document.querySelector('.profile__avatar-image').src = data.ImageLink;
});

profileAvatarBtn.addEventListener('click', () => {
  popupAvatarEdit.open();
  validateEditProfile.clearErrors();
  popupAvatarEdit.setEventListeners();
})

const cardList = new CardSection(cardsSelector); // cardsSelector = '.cards'

const popupWithFormAdd = new PopupWithForm(popupAddCardSelector, (data) => { //popupAddCardSelector = '.popup-add-card'
  api.addCard(data.cardName, data.cardLink)
    .then(res => {
      // console.log(res)
      const arrData = {name: data.cardName, link: data.cardLink}; //arrData объект с именем и ссылкой
      const card = createCard(arrData, idCardTemplate, handlePopupImage, handlePopupDelete); //idCardTemplate = '#tempCard'
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
      popupWithFormAdd.close();
    });

});

const userInfo =  new UserInfo(name, status);
api.getInitialUser()
  .then(res => {
    // console.log(res)
    userInfo.setUserInfo(res.name, res.about)
  })

const popupWithFormEdit = new PopupWithForm(popupProfileSelector, (data) => { //popupProfileSelector = '.popup-profile'
  // console.log(data);
  api.editProfile(data.person_name, data.person_status);
  const profileName = data.person_name;
  const profileStatus = data.person_status;
  userInfo.setUserInfo(profileName, profileStatus);
});

validateAddCard.enableValidation();
validateEditProfile.enableValidation();
validateEditAvatar.enableValidation();


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

function createCard (data, selector, popup, handlePopupDelete, counterLikes, ID, idCard, handleLike) {
  const card = new Card(data, selector, popup, handlePopupDelete, counterLikes, ID, idCard, handleLike);
  // console.log(card)
  return card;
}

function handlePopupImage (link, name) {
  popupWithImage.open(link, name);
  popupWithImage.setEventListeners();
}

function handlePopupDelete (card, idCard) {
  api.deleteCard(idCard);
  const deletePopup = new DeletePopup(card, popupDeleteCardSelector);
  deletePopup.setEventListeners();
  deletePopup.open();
}

function handleLike (like, idCard) {
    if(like.classList.contains('card__btn-like_active')){
      // console.log('ЛАЙК СТОИТ')
      api.like(idCard);

    } else {
      // console.log('ЛАЙК НЕ СТОИТ')
      api.removeLike(idCard);
    }
}

api.getInitialCards()
  .then((res) => {
    // console.log(res);
    const cardL = new Section({
      data: res,
      renderer: (item) => {
        // console.log(item.owner._id)
        const card = createCard(item, idCardTemplate, handlePopupImage, handlePopupDelete, item.likes.length, item.owner._id, item._id, handleLike); //idCardTemplate = '#tempCard'
        const cardElement = card.createCard();
        // console.dir(cardElement)
        cardL.addItem(cardElement);
      }
    }, cardsSelector);
    cardL.renderer();

  })



