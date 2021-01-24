import CardSection from '../components/CardSection.js';

export default class Section extends CardSection{
  constructor({data, renderer}, containerSelector) {
    super(containerSelector);
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  renderer () {
    this._items.forEach(item => this._renderer(item));
  }
}