import Popup from "./Popup";

export default class DeletePopup extends Popup {
  constructor(popupSelector, handlePopupDelete, handleRemover){
    super(popupSelector);
    this._hendler = handlePopupDelete;
    this._handleRemover = handleRemover;
    this._param;
  }

  removerElement(card) {
    card.closest('.card').remove();
  }

  delete(card, idCard) {
    this._popup.querySelector('.popup__form')
      .addEventListener('click', this._param = () => {
        this._handleRemover(card, idCard);
        this.close();
      })
  }

  close() {
    this._popup.querySelector('.popup__form')
          .removeEventListener('click', this._param)
    super.close();
  }

  setEventListeners () {
    super.setEventListeners();
  }
}