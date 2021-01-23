export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupOverlay = this._popup.querySelector('.popup__overlay');
    this._popupBtnClose = this._popup.querySelector('.popup__btn-close');

  }



  open ()  {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close () {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupOverlay.removeEventListener('click', this.close);
    this._popupBtnClose.removeEventListener('click', this.close);
  }

  setEventListeners () {
    this._popupOverlay.addEventListener('click', this.close);
    this._popupBtnClose.addEventListener('click', this.close);
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

}