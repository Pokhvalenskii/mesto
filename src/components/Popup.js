export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open ()  {
    this._popup.classList.add('popup_active');
  }

  close () {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.querySelector('.popup__overlay')
    .removeEventListener('click', this.close);
    this._popup.querySelector('.popup__btn-close')
    .removeEventListener('click', this.close);
  }

  setEventListeners () {
    this._popup.querySelector('.popup__overlay')
    .addEventListener('click', this.close);
    this._popup.querySelector('.popup__btn-close')
    .addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);

  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      console.log('delete')
      this.close();
    }
  }
}