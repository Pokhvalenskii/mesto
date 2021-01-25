import PopupWithForm from "./PopupWithForm";

export default class DeletePopup extends PopupWithForm {
  constructor(popupSelector){
    super(popupSelector);
    // this.card = card;
  }

  delete(card) {
    card.closest('.card').remove();
  }

  setEventListeners (card) {
    super.setEventListeners();
    this._popup.querySelector('.popup__form')
      .addEventListener('click', this.param = (evt) => {
        evt.preventDefault();
        this.delete(card)
        this.close()
      })
  }

  close() {
    super.close()
    this._popup.querySelector('.popup__form')
      .removeEventListener('click', this.param);
  }

}