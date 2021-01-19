import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(selectorPopop) {
    super(selectorPopop);
    this.popupImg = this._popup.querySelector('.popup-img__image');
  }

  open(link, name) {
    super.open();
    this.popupImg.src = link;
    this.popupImg.alt = name;
    this._popup.querySelector('.popup-img__subtitle').textContent = name;
  }
}