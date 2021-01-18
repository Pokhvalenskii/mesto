import Popup from './Popup.js';

export default class PopupWithForm extends Popup{

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.selector = popupSelector;
    this.submit = submitHandler;
    // this.close = this.close.bind(this)    
    this.wrapper = this.wrapper.bind(this);
  }

  setEventListeners () {
    super.setEventListeners();
    document
    .querySelector(this.selector)
    .querySelector('.popup__form')
    .addEventListener('submit', this.wrapper)   

  }

  wrapper () {
    this.submit(this._getInputValues());
    this.close()
  }

  _getInputValues() {
    return document.querySelector(this.selector).querySelector('.popup__form');
  }

  close () {
    this._getInputValues().reset();
    super.close()
  }

}