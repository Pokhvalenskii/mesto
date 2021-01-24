export default class Card {
  constructor(item, cardSelector, hendlerImage, handlePopupDelete) {
    this._name = item.name
    this._link = item.link;
    this._selector = cardSelector;
    this._hendlerImage = hendlerImage
    this._handlePopupDelete = handlePopupDelete;
  }

  _getTemplate () {
    const template = document
    .querySelector(this._selector)
    .content
    .cloneNode(true);
    console.log(template);
    return template;
  }

  createMyCard () {

    this.myCardItem = this.createCard();
    this.myCardItem.querySelector('.card__image').insertAdjacentHTML('beforebegin', '<button class="card__btn-remove"></button>');
    console.log(this.myCardItem.querySelector('.card__image-wrapper'))
    this.myCardItem
      .querySelector('.card__btn-remove')
      .addEventListener('click', (evt) => {
        this._handlePopupDelete(evt.target.closest('.card'));
      })

    return this.myCardItem;
  }

  createCard () {
    this.cardItem = this._getTemplate();

    const like = this.cardItem.querySelector('.card__btn-like');

    // const junk = this.cardItem.querySelector('.card__btn-remove');
    const image = this.cardItem.querySelector('.card__image');
    this.cardItem.querySelector('.card__text').textContent = this._name;
    image.src = this._link;
    image.alt = this._name;

    this._setEventListeners(like, image);
    // console.log(this.cardItem, 'CARD')
    return this.cardItem;
  }

  _setEventListeners (like, image) {
    like.addEventListener('click', (event) => {
      event.target.classList.toggle('card__btn-like_active');
    });

    // junk.addEventListener('click', () => {
    //   this._handlePopupDelete(event.target.closest('.card'));
    // })

    image.addEventListener('click', () => {
      this._hendlerImage(this._link, this._name);
    })
  }

}
