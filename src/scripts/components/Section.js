export default class Section {
  constructor({items, renderer}, containerSelector) {
    this.items =items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  startRender(item, user) {
      const newCard = this.renderer(item, user);
      this.addItem(newCard);
  }
  addItem(el) {
//который принимает DOM-элемент и добавляет его в контейнер.
    this.container.prepend(el);
  }
}


