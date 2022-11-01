

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
  //этот метод делает пустой блок с болванки
  _getTemplate() {
    const createCard = document.querySelector('#template-card')
    .content
    .querySelector('.element').cloneNode(true)

    return(createCard);
  }
  // этот метод отрисовывает блок и убирает в него данные
  render(container, item) {
  this._view = this._getTemplate();

  this.name = this._view.querySelector('.element__text').textContent = item.name; //мы пока сюда ничего не дали, а надо передать элементы массива
  this.image = this._view.querySelector('.element__photo').src = item.link;
  this.alt = this._view.querySelector('.element__photo').alt = item.name;

  //вызывает метод, который повесит слушатели на создаваемую карточку
  this._setEventListeners(container);
  container.prepend(this._view);
  }

  //вешает слушатели на карточки
  _setEventListeners() {
    this._like();
    this._trash();

  }
  // метод для лайков
  _like() {
    this._view.querySelector('.like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('like_active');
    });
  }

  //а  этот метод удаляет карточки
  _trash() {
    this._view.querySelector('.trash-button').addEventListener('click', (evt)=> {
       evt.target.closest(".element").remove();
    });
  }

}

