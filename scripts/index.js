const arrayCards = [
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
const btnClose = document.querySelector('.popup__btn-close-image');
const btnCloseImg = document.querySelector('.popup-img__btn-close-image');
const btnAdd = document.querySelector('.profile__btn-add');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');

// const form = document.querySelector('.popup__form');
const form = document.querySelectorAll('.popupform');

const name = document.querySelector('.profile__person-name');
const status = document.querySelector('.profile__person-status');
const nameValue = document.querySelector('.popup__input-line_type_name');
const statusValue = document.querySelector('.popup__input-line_type_status');

const popupAdd = document.querySelector('.popup-add-card');
const popupProfile = document.querySelector('.popup-profile');
const popupBtnClose = document.querySelectorAll('.popupbtn-close');
const popupImg = document.querySelector('.popup-img');
const popupSave = document.querySelectorAll('.popupbtn-save')

// btnEdit.addEventListener('click', showPopup);
// btnClose.addEventListener('click', showPopup);
// form.addEventListener('submit', saveEdits);

btnEdit.addEventListener('click', () => {

  popupOpen(popupProfile);
  popup.closest('.popup-profile').querySelector('.popupinput_place_up').value = name.textContent;
  popup.closest('.popup-profile').querySelector('.popupinput_place_down').value = status.textContent;
  console.log('попап редактирования')
});

btnAdd.addEventListener('click', () => {
  popupOpen(popupAdd);
  console.log('попап добавления')
});

// console.log(form)

popupSave.forEach((item) => {
  
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    f(item);
  })
})

function f (item) {
  const popup = item.closest('.popup');
  const upPlace = popup.querySelector('.popupinput_place_up').value;
  const downPlace = popup.querySelector('.popupinput_place_down').value;
  console.log('NODA: ', popup, ' VALUE-up: ', upPlace, ' VANUE-down: ', downPlace);


  // console.log('ПОПАП ИЗ ФУНКЦИИ', item)

  // console.log('CLOSEST ', node.classList.contains('.popup-profile'));

  if(popup.closest('.popup-profile')){
    name.textContent = upPlace;
    status.textContent = downPlace;
  }
  if(popup.closest('.popup-add-card')){
    console.log('тут будем создавать карточку')
    const arrData = {name: upPlace, link: downPlace};
    console.log(arrData);
    addCard(creatingCard(arrData));
  }
}

// form.forEach((item) => {
//   console.log(item.parentNode);
//   item.addEventListener('click', (evt) => {
//     evt.preventDefault();
//     const parent = item.parentNode
//     console.log('PARENT: ',parent);
//     console.log('NODA: ', item);
//   })
// })



popupBtnClose.forEach((item)=>{
  item.addEventListener('click', () => {
    popups.forEach(popupClose);
    console.log('закрыли попап')
  });
})

function popupOpen (popup) {
  popup.classList.add('popup_active');
}

function popupClose (popup) {
  popup.classList.remove('popup_active');
}

// function saveEdits (e) {
//   e.preventDefault();
//   showPopup(e);
// }




// function showPopup (Event) {
//   const evtTarget = Event.target;

//   if(evtTarget === btnAdd) {
//     popup.classList.add('popup_active');
//     popup.querySelector('.popup__btn-save').classList.add('popup__btn-save_theme_add');
//     //console.log('Добавить');
//     popup.querySelector('.popup__title').textContent = 'Новое место';
//     popup.querySelector('.popup__btn-save').textContent = 'Создать';
//     nameValue.value = '';
//     statusValue.value = '';
//     nameValue.setAttribute('placeholder', 'Название');
//     statusValue.setAttribute('placeholder', 'Ссылка на картинку');
//   }

//   if(evtTarget === btnEdit) {

//     popup.classList.add('popup_active');
//     popup.querySelector('.popup__btn-save').classList.add('popup__btn-save_theme_edit');
//     //console.log('Редактировать');
//     popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
//     popup.querySelector('.popup__btn-save').textContent = 'Сохранить';
//     statusValue.value = status.textContent;
//     nameValue.value = name.textContent;
//     nameValue.setAttribute('placeholder', 'Имя');
//     statusValue.setAttribute('placeholder', 'Должность');
//   }

//   if(evtTarget === btnClose) {
//     //console.log('закрыть')
//     popup.classList.add('popup_closed');

//     setTimeout(function(){
//       popup.classList.remove('popup_active');
//       popup.classList.remove('popup_closed');
//       popup.querySelector('.popup__btn-save').classList.remove('popup__btn-save_theme_edit');
//       popup.querySelector('.popup__btn-save').classList.remove('popup__btn-save_theme_add');
//     }, 500)
//   }

//   if(evtTarget === form) {
//     //console.log('форма');
//     const choice = popup.querySelector('.popup__btn-save').textContent;
//     //console.log('Ответ от формы: ',choice);

//     if(choice === 'Создать'){
//       //console.log('Добавляем карточку');
//       addCard(nameValue.value, statusValue.value);

//     } else if(choice === 'Сохранить'){
//       //console.log('Сохраняем форму редактирования');
//       name.textContent = nameValue.value;
//       status.textContent = statusValue.value;
//     }
//   }
// }

const card = arrayCards.map(creatingCard)
card.forEach(addCard);

function creatingCard (item) {
  const tempCard = document.querySelector('#tempCard').content.cloneNode(true);
  const cardText = tempCard.querySelector('.card__text');
  const cardImage = tempCard.querySelector('.card__image');
  const like = tempCard.querySelector('.card__btn-like')

  cardText.textContent = item.name;
  cardImage.src = item.link;

  cardImage.addEventListener('click', (event) => {
    console.log(event.target);
    popupOpen(popupImg);
  });

  like.addEventListener('click', (event) => {
    console.log('жмякнул лайк', event.target)
    event.target.classList.toggle('card__btn-like_active');
  });

  return tempCard;
}

function addCard (item) {
  cardPlace.prepend(item);
}

// function addCard (name, link) {
//   const tempCard = document.querySelector('#tempCard').content.cloneNode(true);
//   const cardText = tempCard.querySelector('.card__text');
//   cardText.textContent = name;
//   const cardImage = tempCard.querySelector('.card__image');
//   cardImage.src = link;

//   tempCard.querySelector('.card__btn-remove').addEventListener('click', event => {
//     const card = event.target.closest('.card');
//     card.remove();
//   })

//   tempCard.querySelector('.card__image').addEventListener('click', () => {
//     const popupImg = document.querySelector('.popup-img');
//     popupImg.classList.add('popup-img_active');
//     popupImg.querySelector('.popup-img__image').src = cardImage.src;
//     popupImg.querySelector('.popup-img__subtitle').textContent = cardText.textContent
//     //console.log(cardImage.src);

//     popupImg.querySelector('.popup-img__btn-close').addEventListener('click', () => {
//       popupImg.classList.remove('popup-img_active');
//     })
//   })

//   tempCard.querySelector('.card__btn-like').addEventListener('click', event => {
//     //console.log('жмякнул лайк')
//     const likeAction = event.target.closest('.card__btn-like');
//     //console.log(likeAction.classList.contains('card__btn-like'));
//     if(likeAction.classList.contains('card__btn-like_active')){
//       likeAction.classList.remove('card__btn-like_active');
//     } else {
//       likeAction.classList.add('card__btn-like_active');
//     }
//   })

//   cardPlace.prepend(tempCard);
// }



// arrayCards.forEach(element => {

//   const tempCard = document.querySelector('#tempCard').content.cloneNode(true);
//   const cardText = tempCard.querySelector('.card__text');
//   cardText.textContent = element.name;
//   const cardImage = tempCard.querySelector('.card__image');
//   cardImage.src = element.link;

//   tempCard.querySelector('.card__btn-remove').addEventListener('click', event => {
//     const card = event.target.closest('.card');
//     card.remove();
//   })

//   tempCard.querySelector('.card__image').addEventListener('click', () => {
//     const popupImg = document.querySelector('.popup-img');
//     popupImg.classList.add('popup-img_active');
//     popupImg.querySelector('.popup-img__image').src = cardImage.src;

//     popupImg.querySelector('.popup-img__subtitle').textContent = cardText.textContent
//     //console.log(cardImage.src);

//     popupImg.querySelector('.popup-img__btn-close').addEventListener('click', () => {
//       popupImg.classList.add('popup-img_closed');
//       setTimeout(function(){
//         popupImg.classList.remove('popup-img_active');
//         popupImg.classList.remove('popup-img_closed');
//       }, 500)
//     })
//   })

//   tempCard.querySelector('.card__btn-like').addEventListener('click', event => {
//     //console.log('жмякнул лайк')
//     const likeAction = event.target.closest('.card__btn-like');
//     //console.log(likeAction.classList.contains('card__btn-like'));
//     if(likeAction.classList.contains('card__btn-like_active')){
//       likeAction.classList.remove('card__btn-like_active');
//     } else {
//       likeAction.classList.add('card__btn-like_active');
//     }
//   })

//   cardPlace.append(tempCard);
// });

