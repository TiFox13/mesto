export default class Card {
  constructor(item, templateSelector, handleCardClick, confirmation, addLike, deleteLike, userId, compareId) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._owner = item.owner;
    this._userId = userId;
//теперь добавим все функции
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._confirmation = confirmation;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this.compareId = compareId;
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
    this._trashButton = this._view.querySelector('.trash-button');
    this._likeButton = this._view.querySelector('.like');

    this._image.src = this._link;
    this._image.alt = this._name;

    this._likesCounter = this._view.querySelector('.like-counter');
    this._likesCounter.textContent = this._likes.length;

    //пользователь уже лайкал эту карточку?
    if (this._likes.some(this.compareId) === true) {
    this._likeButton.classList.add('like_active')
    }

     //вызывает метод, который повесит слушатели на создаваемую карточку
    this._setEventListeners();
    if (this._owner._id != this._userId) {  
     this._trashButton.remove();
    } 
    this._image.addEventListener('click', ()=> {
      this._handleCardClick(this._link, this._name);
    });

    return this._view;
  }

  //вешает слушатели на карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', () =>{
      if (this._likeButton.classList.contains('like_active')) {
        this._deleteLike(this._id)
      } else {
        this._addLike(this._id)
      }
    });
    this._trashButton.addEventListener('click',  () => this._confirmation(this._id, this._view));
  }

  //лайк поставили
  onLike() {
    this._likeButton.classList.add('like_active');
      this._likes.length  = this._likes.length +1 ;
      this._likesCounter.textContent = this._likes.length;
  }

  //лайк сняли
  offLike() {
    this._likeButton.classList.remove('like_active');
      this._likes.length  = this._likes.length -1;
      this._likesCounter.textContent = this._likes.length; 
  }

  //удаление карточки
  trash() { 
    this._view.remove()
    this._element = null; 
  } 
}