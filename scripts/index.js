import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {cardsArray} from './initial-сards.js';
import Popup from './Popup.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'


const cfgValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidSelector: 'popup__input_status_invalid',
  submitSelector: '.popup__btn-save',
  submitInvalidSelector: '.popup__btn-save_status_invalid',
  submitStateInvalidSelector: 'popup__btn-save_state_invalid',
  submitStateValidSelector: 'popup__btn-save_state_valid'
};

const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');
const name = document.querySelector('.profile__person-name');
const status = document.querySelector('.profile__person-status');

const popupAdd = document.querySelector('.popup-add-card');

const submitAdd = popupAdd.querySelector('.popup__form');
// console.log(submitAdd)

const popupProfile = document.querySelector('.popup-profile');
const submitEdit = popupProfile.querySelector('.popup__form');
const popupImg = document.querySelector('.popup-img');
export const popupImgPicture = popupImg.querySelector('.popup-img__image')
export const popupImgTitle = popupImg.querySelector('.popup-img__subtitle')
const profileName = popupProfile.querySelector('.popup__input_place_up');
const profileStatus = popupProfile.querySelector('.popup__input_place_down');

const placeTitle = popupAdd.querySelector('.popup__input_place_up');
const placeLink = popupAdd.querySelector('.popup__input_place_down');
// console.log(placeTitle.value, 'place title')
const addCardSubmitButton = popupAdd.querySelector('.popup__btn-save');
let handleEsc;


// const popupWithImage = new PopupWithImage('.popup-img');
// console.log(popupWithImage)

const popupProfileClass = new Popup('.popup-profile');
const popupAddClass = new Popup('.popup-add-card');
const popupPictureClass = new Popup('.popup-img');
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




cardList.initialCards();
validateAddCard.enableValidation();
validateEditProfile.enableValidation();

btnEdit.addEventListener('click', () => {
  popupProfileClass.open();
  profileName.value = name.textContent;
  profileStatus.value = status.textContent;

});

btnAdd.addEventListener('click', () => {
  popupAddClass.open();
});

submitEdit.addEventListener('submit', (event) => {
  name.textContent = profileName.value;
  status.textContent = profileStatus.value;
  // closePopup(popupProfile);
  popupPictureClass.close();
});

const popupWithFormAdd = new PopupWithForm('.popup-add-card', (data) => {

  const placeUp = data.name.value;
  const placeDown = data.link.value;
  const arrData = {name: placeUp, link: placeDown};
  console.log('helloADDEVENT' , arrData);
  const popupWithImage = new PopupWithImage(arrData, '.popup-img');
  const card = new Card(arrData, '#tempCard', popupWithImage);
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
});

popupWithFormAdd.setEventListeners();


// popupWithFormAdd._getInputValues();

// submitAdd.addEventListener('submit', (event) => {
//   const placeUp = placeTitle.value;
//   const placeDown = placeLink.value;
//   const arrData = {name: placeUp, link: placeDown};
//   console.log(event);
//   console.log(arrData, 'SUBMIT EVENT')

//   const popupWithImage = new PopupWithImage(arrData, '.popup-img');
//   const card = new Card(arrData, '#tempCard', popupWithImage);

//   const cardElement = card.createCard();
//   cardList.addItem(cardElement);
//   //addCard(cardElement);
//   submitAdd.reset();
//   addCardSubmitButton.disabled = true;
//   addCardSubmitButton.classList.remove(cfgValidation.submitStateValidSelector);
//   addCardSubmitButton.classList.add(cfgValidation.submitStateInvalidSelector);
//   popupAddClass.close();
// });


// function openPopupImage (link, name) {
//   // openPopup(popupImg);
//   // popupWithImage.open();
//   popupPictureClass.open();
//   popupImgPicture.src = link;
//   popupImgTitle.textContent = name;
// }

// console.log(closeButtons)

// closeButtons.forEach((item)=>{
//   item.addEventListener('click', (event) => {
//     closePopup(event.target.closest('.popup'));
//   });
// })

// popups.forEach((popup) =>{
//   console.log(popup)
//   popup.querySelector('.popup__overlay').addEventListener('click', () => {
//     closePopup(popup);
//   });
// });

// function openPopup (popup) {
//   document.addEventListener('keydown', handleEsc = (evt) => escClose(evt, popup));
//   popup.classList.add('popup_active');
// }

// function escClose (evt, popup) {
//   if(evt.key === 'Escape') {
//     closePopup(popup)
//   }
// }

// function closePopup (popup) {
//   //document.removeEventListener('keydown', handleEsc)
//   popup.classList.remove('popup_active');
// }



// function addCard (item) {
//   cardPlace.prepend(item);
//   //console.dir(item);
// }

// cardsArray.forEach((item) => {
//   //console.log(item);
//   const card = new Card(item, '#tempCard', openPopupImage);
//   const cardElement = card.createCard();
//   addCard(cardElement);
// });








