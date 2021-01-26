import PopupWithForm from "./PopupWithForm";

export default class DeletePopup extends PopupWithForm {
  constructor(popupSelector){
    super(popupSelector);
    // this.card = card;
  }

  delete(card) {
    card.closest('.card').remove();
    console.log('delete')
  }

  // setEventListeners() {
  //   super.setEventListeners();
  //   this._popup.addEventListener('submit', this.delete)
  // }

  // setEventListeners (card) {
  //   super.setEventListeners();
  //   this._popup.querySelector('.popup__form')
  //     .addEventListener('submit', this.param = (evt) => {
  //       evt.preventDefault();
  //       this.delete(card)
  //       this.close()
  //     })
  // }

  // close() {
  //   super.close()
  //   this._popup.querySelector('.popup__form')
  //     .removeEventListener('click', this.param);
  // }

}