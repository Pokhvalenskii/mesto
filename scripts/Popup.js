export default class Popup {
  constructor(selectorPopop) {
    this._popup = document.querySelector(selectorPopop);
    // console.log(this.selector, '===', this._popup)

    let Esc, closePopup1, closePopup2;
  }

  open () {
    this._popup.classList.add('popup_active');
    this.setEventListeners();
  }

  close () {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this.Esc)

    this._popup.querySelector('.popup__overlay')
      .removeEventListener('click', this.closePopup1);

    this._popup.querySelector('.popup__btn-close')
    .removeEventListener('click', this.closePopup2);
  }

  setEventListeners () {
    this._popup.querySelector('.popup__btn-close')
    .addEventListener('click', this.closePopup2 = () => {
      this.close();
    });

    this._popup.querySelector('.popup__overlay')
    .addEventListener('click', this.closePopup1 = () => {
      this.close();
    });

    document.addEventListener('keydown',
    this.Esc = (evt) => this._handleEscClose(evt))
  }

  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

}