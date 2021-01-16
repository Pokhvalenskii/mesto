import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(selectorPopop) {
    super(selectorPopop);
    this.selectorPopop = selectorPopop;
  }

  open(link, name) {
    super.open();
    document.querySelector(this.selectorPopop).querySelector('.popup-img__image').src = link;
    document.querySelector(this.selectorPopop).querySelector('.popup-img__image').alt = name;
    document.querySelector(this.selectorPopop).querySelector('.popup-img__subtitle').textContent = name;
  }
}