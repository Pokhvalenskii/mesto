import Popup from './Popup.js';

export default class PopupWithForm extends Popup{

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submit = submitHandler;
    this._toWrappingUp = this._toWrappingUp.bind(this);
  }

  setEventListeners () {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._toWrappingUp);
  }

  _toWrappingUp () {
    this.submit(this._getInputValues());
    this.close()
  }

  _getInputValues() {
    const inputsArray = this._popup.querySelectorAll('.popup__input');
    const obj = {};
    inputsArray.forEach((input) => {
      obj[input.name] = input.value
    })
    return obj;
  }

  close () {
    if(!Object.keys(this._getInputValues()).length == 0) {
      this._popup.querySelector('.popup__form').reset();
    }
    super.close()
  }
}