export default class Section {
  constructor( {data, renderer}, selector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  };

  initialCards = () => {
    console.log('testFunction');
     this.renderer(this._items);
  }

  renderer = (item) => {
    item.forEach(item => this._renderer(item));
  }

  addItem = (element) => {
    this._container.prepend(element);    
  }
}