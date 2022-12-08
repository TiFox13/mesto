export default class Card {
  constructor(item, templateSelector, handleCardClick, confirmation, addLike, deleteLike) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._confirmation = confirmation;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._likes = item.likes;
    this._id = item._id;

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
  render(user, {compareId}) {
    this._view = this._getTemplate();
    this._image = this._view.querySelector('.element__photo')
    this._view.querySelector('.element__text').textContent = this._name;
    this._trashButton = this._view.querySelector('.trash-button');
    this._likeButton = this._view.querySelector('.like');

    this._image.src = this._link;
    this._image.alt = this._name;

    this._likesCounter = this._view.querySelector('.like-counter');
    this._likesCounter.textContent = this._likes.length;

//const compareId =  (element)=> {     ///ПО ИДЕЕ. ЭТУ ХРЕНЬ НАДО УНЕСТИ ОТСЮДА В ИНДЕКС!
   //return element._id === user._id
//}

    if (this._likes.some(compareId) === true) {
     // console.log('Алоха!')
this._likeButton.classList.add('like_active')
    }

     //вызывает метод, который повесит слушатели на создаваемую карточку
    this._setEventListeners();
    if (this._id != user.myId) {
      this._trashButton.remove();
    } 
    this._image.addEventListener('click', ()=> {
      this._handleCardClick(this._link, this._name);
    });

    return this._view;
  }

  //вешает слушатели на карточки
  _setEventListeners() {

    this._view.querySelector('.like').addEventListener('click', (evt) =>{
      console.log (evt.target.classList.contains('like_active'))
     if (evt.target.classList.contains('like_active')) {
       evt.target.classList.remove('like_active');
    this._deleteLike(this._id)
    this._likes.length  = this._likes.length -1;
    this._likesCounter.textContent = this._likes.length;  // вот это место под вопросом   (если лайк поставить и снять без обновления страницы, то число возвращается не изначальное, а -1)
     } else {
      evt.target.classList.add('like_active');
      this._addLike(this._id)
      this._likes.length  = this._likes.length +1 ;
      this._likesCounter.textContent = this._likes.length;

     }
    
    });
    this._trashButton.addEventListener('click',  () => this._confirmation(this._id, this._view));
  }

  // метод для лайков
  //_like() {
   // this._view.querySelector('.like').addEventListener('click', function(evt) {
   //   evt.target.classList.toggle('like_active');
  //  });
  //}

  //а  этот метод удаляет карточки
  /*trash() {
     this._view.remove();
    this._element = null;
  }*/
}