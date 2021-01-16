export const cfgValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidSelector: 'popup__input_status_invalid',
  submitSelector: '.popup__btn-save',
  submitInvalidSelector: '.popup__btn-save_status_invalid',
  submitStateInvalidSelector: 'popup__btn-save_state_invalid',
  submitStateValidSelector: 'popup__btn-save_state_valid'
};

export const cardsArray = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const btnEdit = document.querySelector('.profile__btn-edit');
export const btnAdd = document.querySelector('.profile__btn-add');
export const name = document.querySelector('.profile__person-name');
export const status = document.querySelector('.profile__person-status');
const popupAdd = document.querySelector('.popup-add-card');
export const submitAdd = popupAdd.querySelector('.popup__form');
const popupProfile = document.querySelector('.popup-profile');
export const submitEdit = popupProfile.querySelector('.popup__form');
export const popupImg = '.popup-img';
export const profileName = popupProfile.querySelector('.popup__input_place_up');
export const profileStatus = popupProfile.querySelector('.popup__input_place_down');
export const idCardTemplate = '#tempCard';
