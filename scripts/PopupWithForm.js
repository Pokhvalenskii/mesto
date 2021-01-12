import Popup from './Popup.js';

export default class PopupWithForm extends Popup{

  constructor(selector, submit) {
    super(selector);
    this.selector = selector;
    this.submit = submit;

  }
  setEventListeners () {
    console.log('Flag1')
    const bigData = this._getInputValues()
    super.setEventListeners();
    bigData.popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      console.log('CLASS');
      // this.submit(bigData.data);
      this.submit(bigData);
      super.close();
    })
  }
  _getInputValues() {
    const popup = document.querySelector(this.selector);
    const placeUp = popup.querySelector('.popup__input_place_up');
    const placeDown = popup.querySelector('.popup__input_place_down');
    const data = {name: placeUp, link: placeDown}

    return {data, popup};
  }

}