import {bigImagePopup,
  bigImage,
  bigImageName,
  showPopup,
  } from "./utils/utils.js"

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

    return (this._view);
  }

  //вешает слушатели на карточки
  _setEventListeners() {
    this._like();
    this._trash();
    this._show(); //вероятно где-то здесь нужно вызывать попап через метод handleCardClick. картинка,
    //текст и альт в попапе вставляются, а не класее карточек
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

  _show() {  //теперь это надо делать не тут, а в классе попапа с картиночкой! в методе открытия
    const imageToClick = this._view.querySelector('.element__photo');
    imageToClick.addEventListener('click', () => {

      bigImage.src = this._link;
      bigImageName.textContent = this._name;
      showPopup(bigImagePopup);

    });
  }
  }

