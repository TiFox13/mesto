
class Popup {
  constructor(popupSelector){
    this.popup = document.querySelector(popupSelector);
    this.closeButton = this.popup.querySelector('.close-button') //нашли кнопку закрытия именно этого попапа
  }

  open() {
   // console.log('я работаю');
    this.popup.classList.add('popup_opened');
    this.setEventListeners; 
  }

  close() {
  this.popup.classList.remove('popup_opened');
  }

//содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    //console.log('сработала штука');
    if (evt.key ==='Escape') {
     // console.log('а конструкция if?');
  
      this.close();
  }
  }
  // общая функция закрытия через клик вне области попапа
_handleOverlayClose(evt) {
  //console.log('сработала вторая штука');
  if (evt.target === evt.currentTarget) {
    this.close();
  }
};

  setEventListeners() {
    //console.log("листенер на связи!");
    this.closeButton.addEventListener('click',() => this.close());  //слушатель клика иконке закрытия попапа?
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt)); //вешаем слушатель для клика по ESC?
    this.popup.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt)); // вешаем слушатель для клика по оверлею
  }
}


export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);//не помню, как правильно писать, надо читать теорию
    this._image = this.popup.querySelector('.popup-image__image');
    this._text = this.popup.querySelector('.popup-image__place-info');

  }

  open(link, name) { 
   // console.log('jnrhsnbt gjgfg');
    super.open();
    super.setEventListeners();
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
//нужно вставлять картинку и подпись здесь  НО ПОКА НИЧЕГО НЕ СТАВИТСЯ, ТОЛЬКО ОТКРЫВАЕТСЯ И ЗАКРЫВАЕТСЯ
  }


}



export  class PopupWithForm extends Popup {
  constructor(popupSelector, call) {
    super(popupSelector),
    this.call = call
    //должен принимать еще колбек сабмита формы
    this.form = this.popup.querySelector('.form');
  }

  _getInputValues() {
    //который собирает данные всех полей формы.
    
  const name = placeNameInput.value;  //забираем из поля формы название
  const link = placeLinkInput.value; // забираем из поля формы адрес картинки
  
  const newPlase = {name, link}; //создаем массив

  }

  setEventListeners() {
    super.setEventListeners();
    //но и добавлять обработчик сабмита формы.
   this._image.addEventListener('click', () =>{
    this._handleEscClose(this._name, this._link)
   })
    //this.call
  }

  close() {
    super.close();
    this.form.reset()
    //при закрытии попапа форма должна ещё и сбрасываться.
  }
}

