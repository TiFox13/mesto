import { showPopup } from "./index.js";

export default class Card {
  constructor(item, templateSelector) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
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
  render(item) {
  this._view = this._getTemplate();

 this._view.querySelector('.element__text').textContent = item.name;
 this._view.querySelector('.element__photo').src = item.link;
 this._view.querySelector('.element__photo').alt = item.name;

  //вызывает метод, который повесит слушатели на создаваемую карточку
  this._setEventListeners();

  return (this._view);
  }

  //вешает слушатели на карточки
  _setEventListeners() {
    this._like();
    this._trash();
    this._show();
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

  _show() {
    const imageToClick = this._view.querySelector('.element__photo');
    imageToClick.addEventListener('click', () => {

      const bigImagePopup = document.querySelector('.popup_big-image');
      document.querySelector('.popup-image__image').src = this._link;
      document.querySelector('.popup-image__place-info').textContent = this._name;
      showPopup(bigImagePopup);
    });
  }
  }

