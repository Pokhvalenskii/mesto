export default class Card {
  constructor(item, selector, openPopupImage) {
    this.name = item.name
    this.link = item.link;
    this.selector = selector;
    this.openPopupImage = openPopupImage;
  }

  _getTemplate = () => {
    const template = document
    .querySelector(this.selector)
    .content
    .cloneNode(true);

    return template;
  }

  createCard = () => {
    this.cardItem = this._getTemplate();
    const like = this.cardItem.querySelector('.card__btn-like');
    const junk = this.cardItem.querySelector('.card__btn-remove');
    const image = this.cardItem.querySelector('.card__image');
    this.cardItem.querySelector('.card__text').textContent = this.name;
    image.src = this.link;
    image.alt = this.name;

    // this.cardItem.querySelector('.card__image').src = this.link;
    // this.cardItem.querySelector('.card__image').alt = this.name;

    this._addEvent(like, junk, image);

    return this.cardItem;
  }


  _addEvent = (like, junk, image) => {
    like.addEventListener('click', (event) => {
      event.target.classList.toggle('card__btn-like_active');
    });

    junk.addEventListener('click', (event) => {
      event.target.closest('.card').remove();
    });

    image.addEventListener('click', () => {
      this.openPopupImage(this.link, this.name);
    })
  }

}
