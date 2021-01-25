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

api.getInitialUser()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
    document.querySelector('.profile__avatar-image').src = res.avatar;
    return res;
  })
    .then(userInfo => {
      api.getInitialCards()
        .then(res => {
          // console.log(res)
          // console.log(userInfo)
          section.renderer(res, userInfo)
        })
    })

const section = new NewSection({
  renderer: (item, userInfo) => {
    const card = createCard(
      item,
      idCardTemplate,
      handlePopupImage,
      handlePopupDelete,
      handleLike,
    )
    const cardElement = card.createCard(userInfo);
    section.addItem(cardElement);
  }
}, cardsSelector)

const popupWithFormAdd = new PopupWithForm(
  popupAddCardSelector,
  (data) => { //popupAddCardSelector = '.popup-add-card'
  api.addCard(data.cardName, data.cardLink)
  const itemData = {name: data.cardName, link: data.cardLink, likes: 0, _id: 0, owner: {_id: 'asdfsd'}};
   //arrData объект с именем и ссылкой
  api.getInitialUser()
    .then(res => {
      const card = createCard(
        itemData,
        idCardTemplate,
        handlePopupImage,
        handlePopupDelete,
        handleLike,
      )
      const cardElement = card.createCard(res);
      section.addItem(cardElement);
    })
    popupWithFormAdd.close();
  }
);

function createCard (
  item,
  cardSelector,
  handlePopupImage,
  handlePopupDelete,
  handleLike) {
    const card = new Card(
    item,
    cardSelector,
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

// const cardList = new CardSection(cardsSelector); // cardsSelector = '.cards'



const userInfo =  new UserInfo(name, status);



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



function handlePopupImage (link, name) {
  popupWithImage.open(link, name);
  popupWithImage.setEventListeners();
}

const deletePopup = new DeletePopup(popupDeleteCardSelector);

function handlePopupDelete (card, idCard) {
  api.deleteCard(idCard);
  deletePopup.setEventListeners(card);
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



