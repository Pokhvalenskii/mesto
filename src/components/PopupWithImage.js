import Popup from './Popup.js';
// import {popupImgPicture, popupImgTitle} from './../utils/constants.js';

export default class PopupWithImage extends Popup{
  constructor(selectorPopop) {
    super(selectorPopop);
    this.selectorPopop = selectorPopop;
    // this.link = data.link;
    // this.name = data.name;
  }
  open(link, name) {
    super.open();
    console.log(link, name)
    console.log(document.querySelector(this.selectorPopop))
    document.querySelector(this.selectorPopop).querySelector('.popup-img__image').src = link;
    document.querySelector(this.selectorPopop).querySelector('.popup-img__image').alt = name;
    document.querySelector(this.selectorPopop).querySelector('.popup-img__subtitle').textContent = name;
  }
}