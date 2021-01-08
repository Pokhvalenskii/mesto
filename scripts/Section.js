class Section {
  constructor( {data, renderer}, selector) {
    this.items = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  };
}