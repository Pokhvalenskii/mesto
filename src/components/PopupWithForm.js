import Popup from './Popup.js';

export default class PopupWithForm extends Popup{

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.selector = popupSelector;
    this.submit = submitHandler;
    this.wrapper = this.wrapper.bind(this)
  }

  setEventListeners () {
    super.setEventListeners();
    document
    .querySelector(this.selector)
    .querySelector('.popup__form')
    .addEventListener('submit', this.wrapper)

  }

  wrapper () {
    this.submit(document.querySelector(this.selector).querySelector('.popup__form'))
    super.close()
  }

}