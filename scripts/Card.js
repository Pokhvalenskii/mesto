class Card {
  constructor(item, selector) {
    this.name = item.name
    this.link = item.link;
    this.selector = selector;
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

    this.cardItem.querySelector('.card__text').textContent = this.name;
    this.cardItem.querySelector('.card__image').src = this.link;
    this.cardItem.querySelector('.card__image').alt = this.name;

    const like = this.cardItem.querySelector('.card__btn-like');
    const junk = this.cardItem.querySelector('.card__btn-remove');
    const image = this.cardItem.querySelector('.card__image');

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
      openPopup(popupImg);
      popupImgPicture.src = this.link;
      popupImgTitle.textContent = this.name;
    })
  }

}