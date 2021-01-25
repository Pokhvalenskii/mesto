class NewSection {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer (items, userInfo){
    items.forEach(item => {
      this._renderer(item, userInfo);
    });
  }

  addItem (element) {
    this._container.prepend(element);
  }
}

export default NewSection;