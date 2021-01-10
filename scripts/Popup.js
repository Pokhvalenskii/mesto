export default class Popup {
  constructor(selectorPopop) {
    this._popup = document.querySelector(selectorPopop);   
    let Esc;
  }

  open () {
    this._popup.classList.add('popup_active');
    this.setEventListeners();
    console.log('hello from popup')
  }

  close = () => {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this.Esc)
  }

  setEventListeners = () => {
    this._popup.querySelector('.popup__btn-close')
    .addEventListener('click', this.close);

    this._popup.querySelector('.popup__overlay')
    .addEventListener('click', this.close);  
    
    document.addEventListener('keydown',
    this.Esc = (evt) => this._handleEscClose(evt))
  }

  _handleEscClose = (evt) => {    
    console.log('esc -- ', evt);
    if(evt.key === 'Escape') {
      this.close();
    }
  }

}