const cardsArray = [
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

const cardPlace = document.querySelector('.cards');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');
const popups = document.querySelectorAll('.popup');

const forms = document.querySelectorAll('.popup__form');
const submitEdit = forms[0];
const submitAdd = forms[1];

const name = document.querySelector('.profile__person-name');
const status = document.querySelector('.profile__person-status');
const popupAdd = document.querySelector('.popup-add-card');
const popupProfile = document.querySelector('.popup-profile');
const closeButtons = document.querySelectorAll('.popup__btn-close');

const popupImg = document.querySelector('.popup-img');
const popupImgPicture = popupImg.querySelector('.popup-img__image')
const popupImgTitle = popupImg.querySelector('.popup-img__subtitle')

const submitButtons = document.querySelectorAll('.popup__btn-save')
 
const profileName = popupProfile.querySelector('.popup__input_place_up');
const profileStatus = popupProfile.querySelector('.popup__input_place_down');
const placeTitle = popupAdd.querySelector('.popup__input_place_up');
const placeLink = popupAdd.querySelector('.popup__input_place_down');

btnEdit.addEventListener('click', () => {

  openPopup(popupProfile);
  profileName.value = name.textContent;
  profileStatus.value = status.textContent;
});

btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// console.log(submitEdit);
// console.log(submitAdd);

submitEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  name.textContent = profileName.value;
  status.textContent = profileStatus.value;
  closePopup(event.target.closest('.popup'));
});

submitAdd.addEventListener('submit', (event) => {
  event.preventDefault();
  const placeUp = placeTitle.value;
  const placeDown = placeLink.value;
  const arrData = {name: placeUp, link: placeDown};
  addCard(createCard(arrData));
  closePopup(event.target.closest('.popup'));
});


closeButtons.forEach((item)=>{
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
    // console.log('закрыли попап')
  });
})

function openPopup (popup) {
  popup.classList.add('popup_active');
}

function closePopup (popup) {
  popup.classList.remove('popup_active');
}

const cards = cardsArray.map(createCard)
cards.forEach(addCard);

function createCard (item) {
  const tempCard = document.querySelector('#tempCard').content.cloneNode(true);
  const cardText = tempCard.querySelector('.card__text');
  const cardImage = tempCard.querySelector('.card__image');
  const like = tempCard.querySelector('.card__btn-like');
  const junk = tempCard.querySelector('.card__btn-remove');

  cardText.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardImage.addEventListener('click', (event) => {
    // console.log(event.target);
    openPopup(popupImg);
    popupImgPicture.src = item.link;
    popupImgTitle.textContent = item.name;
  });

  like.addEventListener('click', (event) => {
    // console.log('жмякнул лайк', event.target)
    event.target.classList.toggle('card__btn-like_active');
  });

  junk.addEventListener('click', (event) => {
    // console.log('Нажал на ведро');
    event.target.closest('.card').remove();
  });

  return tempCard;
}

function addCard (item) {
  cardPlace.prepend(item);
}

