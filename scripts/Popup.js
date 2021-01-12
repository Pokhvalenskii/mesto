export default class Popup {
  constructor(selectorPopop) {
    this._popup = document.querySelector(selectorPopop);
    // console.log(this.selector, '===', this._popup)

    let Esc, closePopup1, closePopup2;
  }

  test() {
    console.log(this._popup);
  }

  open () {
    console.log('hello from popup', this._popup)

    this._popup.classList.add('popup_active');
    this.setEventListeners();
  }

  close () {
    console.log('click close', this._popup)
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this.Esc)

    this._popup.querySelector('.popup__overlay')
      .removeEventListener('click', this.closePopup1);

    this._popup.querySelector('.popup__btn-close')
    .removeEventListener('click', this.closePopup2);
  }

  setEventListeners () {
    console.log(this._popup, 'POPUP SET EVENT')

    this._popup.querySelector('.popup__btn-close')
    .addEventListener('click', this.closePopup2 = () => {
      console.log('event close1')
      this.close();
    });

    this._popup.querySelector('.popup__overlay')
    .addEventListener('click', this.closePopup1 = () => {
      console.log('event close2')
      this.close();
    });

    document.addEventListener('keydown',
    this.Esc = (evt) => this._handleEscClose(evt))
  }

  _handleEscClose = (evt) => {
    // console.log('esc -- ', evt);
    if(evt.key === 'Escape') {
      console.log('esc click')
      this.close();
    }
  }

}