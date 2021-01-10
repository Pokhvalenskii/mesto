import Popup from './Popup.js';
import {popupImgPicture, popupImgTitle} from './index.js';

export default class PopupWithImage extends Popup{
  constructor(data, cardSelector) {
    super(cardSelector);
    this.link = data.link;
    this.name = data.name;
  }
  open() {
    // console.log('hello')
    super.open();
    popupImgPicture.src = this.link;
    popupImgTitle.textContent = this.name;
  }
}