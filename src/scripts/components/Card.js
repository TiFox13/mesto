export default class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //этот метод делает пустой блок с болванки
  _getTemplate() {
    const createCard = document.querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)

    return(createCard);
  }

  // этот метод отрисовывает блок и убирает в него данные
  render() {
    this._view = this._getTemplate();
    this._image = this._view.querySelector('.element__photo')
    this._view.querySelector('.element__text').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
     //вызывает метод, который повесит слушатели на создаваемую карточку
    this._setEventListeners();
    this._image.addEventListener('click', ()=> {
      this._handleCardClick(this._link, this._name);
    });

    return (this._view);
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
    this._view.querySelector('.trash-button').addEventListener('click', () => this._view.remove());
    this._element = null;
  }
}