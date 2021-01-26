
export default class Card {
  constructor(
    item,
    cardSelector,
    hendlerImage,
    handlePopupDelete,
    // counterLikes,
    // ID,
    // idCard,
    handleLike) {
      this._name = item.name;
      this._link = item.link;
      this._selector = cardSelector;
      this._hendlerImage = hendlerImage
      this._handlePopupDelete = handlePopupDelete;
      this._handleLike = handleLike;
      this._item = item;
      this._likes = item.likes;
      this._ID = item.owner._id;
      this._idCard = item._id;
  }

  _getTemplate () {
    const template = document
    .querySelector(this._selector)
    .content
    .cloneNode(true);
    // console.log(template);
    return template;
  }

  createCard (user) {
    this.cardItem = this._getTemplate();
    const likeSelector = this.cardItem.querySelector('.card__btn-like');
    const counter = this.cardItem.querySelector('.card__counter-likes');
    const image = this.cardItem.querySelector('.card__image');

    if(this._ID === user._id){
      // console.log('ЭТО МОЯ КАРТОЧКА')
      image.insertAdjacentHTML('beforebegin', '<button class="card__btn-remove"></button>');
      this.cardItem.querySelector('.card__btn-remove').addEventListener('click', (evt) => {
        this._handlePopupDelete(evt.target.closest('.card'), this._idCard);
      })
    }
    counter.textContent = this._likes.length
    // console.log('likesID',  this._likes);
    if(this._likes.length >= 1) {
      // console.log('на этой карточке больше 1 лайка');
      this._likes.forEach(like => {
        // console.log(like._id === user._id, 'картачка №: ')
        if(like._id === user._id) {
          // console.log('это моя карточка')
          likeSelector.classList.add('card__btn-like_active');
          console.log(like)
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
    });

    image.addEventListener('click', () => {
      this._hendlerImage(this._link, this._name);
    })
  }

}
