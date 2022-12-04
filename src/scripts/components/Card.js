export default class Card {
  constructor(item, templateSelector, handleCardClick, confirmation) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._confirmation = confirmation;

  }

  //этот метод делает пустой блок с болванки
  _getTemplate() {
    const createCard = document.querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)

    return createCard;
  }

  // этот метод отрисовывает блок и убирает в него данные
  render() {
    this._view = this._getTemplate();
    this._image = this._view.querySelector('.element__photo')
    this._view.querySelector('.element__text').textContent = this._name;
    this._trashButton = this._view.querySelector('.trash-button')
    this._image.src = this._link;
    this._image.alt = this._name;
     //вызывает метод, который повесит слушатели на создаваемую карточку
    this._setEventListeners();
    this._image.addEventListener('click', ()=> {
      this._handleCardClick(this._link, this._name);
    });

    return this._view;
  }

  //вешает слушатели на карточки
  _setEventListeners() {
    this._like();
    this._trashButton.addEventListener('click',  this._confirmation);
  }

  // метод для лайков
  _like() {
    this._view.querySelector('.like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('like_active');
    });
  }

  //а  этот метод удаляет карточки
  trash() {
     this._view.remove();
    this._element = null;
  }
}