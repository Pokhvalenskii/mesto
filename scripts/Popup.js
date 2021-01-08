export default class Popup {
  constructor(selectorPopop) {
    this._popup = document.querySelector(selectorPopop);
    console.log(this._popup, 'class popups');
  }

  open = () => {
    this._popup.classList.add('popup_active');
  }

  close = () => {
    this._popup.classList.remove('popup_active');
  }

  setEventListeners = () => {

  }

  _handleEscClose = () => {

  }
}