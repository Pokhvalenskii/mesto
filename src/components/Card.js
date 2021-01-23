export default class Card {
  constructor(item, cardSelector, hendlerImage, test) {
    this._name = item.name
    this._link = item.link;
    this._selector = cardSelector;
    this._hendlerImage = hendlerImage
    this._test = test;
  }

  _getTemplate () {
    const template = document
    .querySelector(this._selector)
    .content
    .cloneNode(true);

    return template;
  }

  createCard () {
    this.cardItem = this._getTemplate();
    const like = this.cardItem.querySelector('.card__btn-like');
    const junk = this.cardItem.querySelector('.card__btn-remove');
    const image = this.cardItem.querySelector('.card__image');
    this.cardItem.querySelector('.card__text').textContent = this._name;
    image.src = this._link;
    image.alt = this._name;

    this._setEventListeners(like, junk, image);

    return this.cardItem;
  }

  _setEventListeners (like, junk, image) {
    like.addEventListener('click', (event) => {
      event.target.classList.toggle('card__btn-like_active');
    });

    junk.addEventListener('click', (event) => {
      // event.target.closest('.card').remove();
      this._test(event.target.closest('.card'));
      // document.querySelector('.popup-delete-card').classList.add('popup_active');
      // this._hendlerPopup(event.target.closest('.card'))

    });
    image.addEventListener('click', () => {
      this._hendlerImage(this._link, this._name);
    })
  }

}
