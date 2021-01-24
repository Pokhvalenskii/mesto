export default class CardSection {
  constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
  }
  
  addItem (element) {
    this._container.prepend(element);
  }

  // renderer () {
  //   this._items.forEach(item => this._renderer(item));
  // }
}
