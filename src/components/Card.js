
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
    const like = this.cardItem.querySelector('.card__btn-like');
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
    this.cardItem.querySelector('.card__text').textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
    this._setEventListeners(like, image, counter);
    return this.cardItem;
  }

  _setEventListeners (like, image, counter) {
    like.addEventListener('click', (event) => {
      event.target.classList.toggle('card__btn-like_active');
      // console.log(event.target)
      this._handleLike(event.target, this._idCard, counter)
    });

    image.addEventListener('click', () => {
      this._hendlerImage(this._link, this._name);
    })
  }

}
