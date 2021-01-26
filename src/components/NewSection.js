class NewSection {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer (arrCard, user){
    arrCard.forEach(card => {
      this._renderer(card, user);
    });
  }

  addItem (element) {
    this._container.prepend(element);
  }
}

export default NewSection;