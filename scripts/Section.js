//У класса `Section` нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
//import { createCard } from "./index";
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this.items =items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  startRender() {
    this.items.forEach((item) => {
      this.render(item);
  })
}

  render(item) {
//отрисовывает элементы. Отрисовка каждого отдельного элемента должна осуществляться функцией `renderer`.
   const card = this.renderer(item);
      this.addItem(card)
    
}

  addItem(el) {
//который принимает DOM-элемент и добавляет его в контейнер.
this.container.prepend(el);
  }
}


