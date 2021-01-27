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
  submitConfirmDelete,
  selectorAvatarImage,
  } from '../utils/constants.js'
import DeletePopup from '../components/DeletePopup';

const popupWithImage = new PopupWithImage(popupImg);
const validateAddCard = new FormValidator(submitAdd, cfgValidation);
const validateEditProfile = new FormValidator(submitEdit, cfgValidation);
const validateEditAvatar = new FormValidator(submitAvatar, cfgValidation);
const validateConfirmDelete = new FormValidator(submitConfirmDelete, cfgValidation);
popupWithImage.setEventListeners();
validateAddCard.enableValidation();
validateEditProfile.enableValidation();
validateEditAvatar.enableValidation();
validateConfirmDelete.enableValidation();

const api = new Api({
  urlApi: 'https://mesto.nomoreparties.co/v1/',
  token: '8675e632-7ad1-4f28-9202-69cb55994239',
  groupId: 'cohort-19'
})

const section = new NewSection({
  renderer: (cardItem, user) => {
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
    selectorAvatarImage.src = resUser.avatar;
    api.getInitialCards()
      .then(res => {
        const resCard = res;
        section.renderer(resCard, resUser)
      })
  })

const popupWithFormAdd = new PopupWithForm(
  popupAddCardSelector,
  (data) => {
  api.addCard(data.cardName, data.cardLink)
    .then(res => {
      const resCard = res;
      api.getInitialUser()
        .then(res => {
          const resUser = res;
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

popupWithFormAdd.setEventListeners();

function createCard (
  resCard,
  resUser,
  idCardTemplate,
  handlePopupImage,
  handlePopupDelete,
  handleLike,
  ) {
    const card = new Card(
      resCard,
      resUser,
      idCardTemplate,
      handlePopupImage,
      handlePopupDelete,
      handleLike,
      );
  return card;
}

const popupAvatarEdit = new PopupWithForm (profileAvatarSelector,
  (data) => {
    api.editAvatar(data.ImageLink);
    selectorAvatarImage.src = data.ImageLink;
});
popupAvatarEdit.setEventListeners();

profileAvatarBtn.addEventListener('click', () => {
  popupAvatarEdit.open();
  validateEditAvatar.clearErrors();
})

const ava = selectorAvatarImage
const userInfo =  new UserInfo(name, status, ava);
const popupWithFormEdit = new PopupWithForm(popupProfileSelector, (data) => {
  api.editProfile(data['person_name'], data['person_status'])
    .then(res => {
      const profileName = data.person_name;
      const profileStatus = data.person_status;
      userInfo.setUserInfo(profileName, profileStatus, res.avatar)
    })
});
popupWithFormEdit.setEventListeners();

btnEdit.addEventListener('click', () => {
  profileName.value = name.textContent;
  profileStatus.value = status.textContent;
  popupWithFormEdit.open();
  validateEditProfile.clearErrors();
});

btnAdd.addEventListener('click', () => {
  popupWithFormAdd.open();
  validateAddCard.clearErrors();
});

function handlePopupImage (link, name) {
  popupWithImage.open(link, name);
}

const deletePopup = new DeletePopup(popupDeleteCardSelector, handlePopupDelete, removeCard)
deletePopup.setEventListeners();

function removeCard (card, idCard) {
  api.deleteCard(idCard)
        .then(res => {
          deletePopup.removerElement(card);
        })
}

function handlePopupDelete (card, idCard)  {
  deletePopup.open();
  deletePopup.delete(card, idCard);
}


function handleLike (like, idCard, counter) {
  if(like.classList.contains('card__btn-like_active')){
    counter.textContent = +counter.textContent + 1;
    api.like(idCard);
  } else {
    counter.textContent = +counter.textContent - 1;
    api.removeLike(idCard);
  }
}



