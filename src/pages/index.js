import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import NewSection from '../components/NewSection.js'

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

const section = new NewSection({ 
  renderer: (cardItem, user) => { 
    // console.log('ITEMS', cardItem)
    // console.log('USER', user)
    const card = createCard(
      cardItem,
      user,       
      idCardTemplate, 
      handlePopupImage, 
      handlePopupDelete, 
      handleLike, 
    ) 
    const cardElement = card.createCard(); 
    section.addItem(cardElement); 
  } 
}, cardsSelector) 

api.getInitialUser()
  .then(res => {    
    const resUser = res;
    userInfo.setUserInfo(resUser.name, resUser.about, res.avatar) 
    document.querySelector('.profile__avatar-image').src = resUser.avatar;
    // console.log('USER',resUser)
    api.getInitialCards()
      .then(res => {        
        const resCard = res;
        // console.log('CARDS',resCard);
        section.renderer(resCard, resUser)
      })
  })   

const popupWithFormAdd = new PopupWithForm(
  popupAddCardSelector,
  (data) => { //popupAddCardSelector = '.popup-add-card'
  api.addCard(data.cardName, data.cardLink)
    .then(res => {
      console.log(res)
      const resCard = res;
      api.getInitialUser()
        .then(res => {
          const resUser = res;
          console.log(resCard, 'ЭТО НАША КАРТОЧКА ПОСЛЕ ДОБАВЛЕНИЯ');
          console.log(resUser, 'А ЭТО НАШ ЮЗЕР ПОСЛЕ ПОЛУЧЕНИЯ ОТВЕТА');
          const card = createCard(
            resCard,
            resUser,
            idCardTemplate,
            handlePopupImage,
            handlePopupDelete,
            handleLike,
          )          
          const cardElement = card.createCard()
          section.addItem(cardElement);
        })    
      popupWithFormAdd.close();
    })
  }
);

function createCard (
  resCard,
  resUser,
  idCardTemplate,
  handlePopupImage,
  handlePopupDelete,
  handleLike) {
    const card = new Card(
      resCard,
      resUser,
      idCardTemplate,
      handlePopupImage,
      handlePopupDelete,
      handleLike);
  return card;
}


const popupAvatarEdit = new PopupWithForm (profileAvatarSelector, (data) => {
  api.editAvatar(data.ImageLink);
  document.querySelector('.profile__avatar-image').src = data.ImageLink;
});

profileAvatarBtn.addEventListener('click', () => {
  popupAvatarEdit.open();
  validateEditProfile.clearErrors();
  popupAvatarEdit.setEventListeners();
})

const ava = document.querySelector('.profile__avatar-image')
// const cardList = new CardSection(cardsSelector); // cardsSelector = '.cards'
const userInfo =  new UserInfo(name, status, ava);
const popupWithFormEdit = new PopupWithForm(popupProfileSelector, (data) => { //popupProfileSelector = '.popup-profile'
  // console.log(data);
  api.editProfile(data.person_name, data.person_status)
    .then(res => {
      console.log('ПОМЕНЯЛ АВУ', res)
      const profileName = data.person_name;
      const profileStatus = data.person_status;
      userInfo.setUserInfo(profileName, profileStatus, res.avatar)
    })  
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

function handlePopupImage (link, name) {
  popupWithImage.open(link, name);
  popupWithImage.setEventListeners();
}

const deletePopup = new DeletePopup(popupDeleteCardSelector);


function handlePopupDelete (card, idCard) {
  api.deleteCard(idCard)
    .then(res => {
      console.log('RES УДАЛЕНИЯ ', res)
      deletePopup.delete(card);
    })
  console.log('delete popup')
  // deletePopup.setEventListeners(card);
  deletePopup.open();
}


function handleLike (like, idCard, counter) {
    if(like.classList.contains('card__btn-like_active')){
      // console.log('ЛАЙК СТОИТ', like)
      // console.log()
      counter.textContent = +counter.textContent + 1;
      api.like(idCard);

    } else {
      // console.log('ЛАЙК НЕ СТОИТ')
      counter.textContent = +counter.textContent - 1;
      api.removeLike(idCard);
    }
}



