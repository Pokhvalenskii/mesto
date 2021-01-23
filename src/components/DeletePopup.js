import PopupWithForm from "./PopupWithForm";

export default class DeletePopup extends PopupWithForm {
  constructor(card, popupSelector){
    super(popupSelector);
    this.card = card;
  }

  delete() {
    this.card.closest('.card').remove();
  }

  setEventListeners () {
    super.setEventListeners();
    this._popup.querySelector('.popup__form')
      .addEventListener('click', this.param = (evt) => {
        evt.preventDefault();
        this.delete()
        this.close()
      })
  }

  close() {
    super.close()
    this._popup.querySelector('.popup__form')
      .removeEventListener('click', this.param);
  }

}