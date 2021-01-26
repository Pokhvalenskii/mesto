import Popup from "./Popup";

export default class DeletePopup extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  delete(card) {
    card.closest('.card').remove();
    // console.log('delete_DELETE')
  }
}