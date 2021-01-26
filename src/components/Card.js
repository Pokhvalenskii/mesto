
export default class Card {
  constructor(
    card,
    user,
    cardSelector,
    hendlerImage,
    handlePopupDelete,
    handleLike) {
      this._name = card.name;
      this._link = card.link;
      this._selector = cardSelector;
      this._hendlerImage = hendlerImage
      this._handlePopupDelete = handlePopupDelete;
      this._handleLike = handleLike;
      this._likes = card.likes;
      this._idUserCard = card.owner._id;
      this._idCard = card._id;
      this._idUser = user._id;
  }

  _getTemplate () {
    const template = document
    .querySelector(this._selector)
    .content
    .cloneNode(true);
    return template;
  }

  createCard () {
    // console.log(this._ID, ' <= наш айди')
    this.cardItem = this._getTemplate();
    const likeSelector = this.cardItem.querySelector('.card__btn-like');
    const counter = this.cardItem.querySelector('.card__counter-likes');
    const image = this.cardItem.querySelector('.card__image');

    if(this._idUserCard === this._idUser){
      // console.log('ЭТО МОЯ КАРТОЧКА')
      image.insertAdjacentHTML('beforebegin', '<button class="card__btn-remove"></button>');
      this.cardItem.querySelector('.card__btn-remove').addEventListener('click', (evt) => {
        console.log('setdeleteButton')
        // this._handlePopupDelete(evt.target.closest('.card'), this._idCard);
      })
    }
    counter.textContent = this._likes.length
    // console.log('likesID',  this._likes);
    if(this._likes.length >= 1) {
      // console.log('на этой карточке больше 1 лайка');
      this._likes.forEach(like => {
        // console.log(like._id === user._id, 'картачка №: ')
        if(like._id === this._idUser) {
          // console.log('это моя карточка')
          likeSelector.classList.add('card__btn-like_active');
          // console.log(like)
        }
      });
    }
    this.cardItem.querySelector('.card__text').textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
    this._setEventListeners(likeSelector, image, counter);
    return this.cardItem;
  }

  _setEventListeners (likeSelector, image, counter) {
    likeSelector.addEventListener('click', (event) => {
      event.target.classList.toggle('card__btn-like_active');
      // console.log(event.target)
      this._handleLike(event.target, this._idCard, counter)
      // this._handleLike(event.target, this._ID, counter)

    });

    image.addEventListener('click', () => {
      this._hendlerImage(this._link, this._name);
    })
  }

}
