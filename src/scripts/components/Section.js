export default class Section {
  constructor({items, renderer}, containerSelector) {
    this.items =items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  startRender() {
    this.items.forEach((item) => {
      const newCard = this.renderer(item);
      this.addItem(newCard);
    })
  }
  addItem(el) {
//который принимает DOM-элемент и добавляет его в контейнер.
    this.container.prepend(el);
  }
}


