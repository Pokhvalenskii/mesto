export default class Section {
  constructor( {data, renderer}, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  // initialCards () {
  //    this.renderer(this._items);
  // }

  // renderer (item) {
  //   item.forEach(item => this._renderer(item));
  // }

  renderer () {
    this._items.forEach(item => this._renderer(item));
  }

  addItem (element) {
    this._container.prepend(element);
  }
}