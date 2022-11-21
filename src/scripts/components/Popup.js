class Popup {
  constructor(popupSelector){
    this.popup = document.querySelector(popupSelector);
    this.closeButton = this.popup.querySelector('.close-button') //нашли кнопку закрытия именно этого попапа
  }

  open() {
    // console.log('я работаю');
    this.popup.classList.add('popup_opened');
    this.setEventListeners(); 
  }

  close() {
    this.popup.classList.remove('popup_opened');
    this.closeButton.removeEventListener('click',() => this.close());  //слушатель клика иконке закрытия попапа?
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt)); //вешаем слушатель для клика по ESC?
    this.popup.removeEventListener('mousedown', (evt) => this._handleOverlayClose(evt)); // вешаем слушатель для клика по оверлею
  }

//содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    //console.log('сработала штука');
    if (evt.key ==='Escape') {
     // console.log('а конструкция if?');
      this.close();
    }
  }

    // метод закрытия через клик вне области попапа
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

export  class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._image = this.popup.querySelector('.popup-image__image');
    this._text = this.popup.querySelector('.popup-image__place-info');
  }

  open(link, name) { 
    //console.log('открытие сработало');
    super.open();
    super.setEventListeners();
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
  }
}

export  class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector),
    this.handleSubmit = handleSubmit,
    //должен принимать еще колбек сабмита формы
    this.form = this.popup.querySelector('.form'),
    this._inputList = Array.from(this.form.querySelectorAll('.input'));
  }

  _getInputValues() {
    this._formInputValues = {};
    this._inputList. forEach(input => {
      this._formInputValues[item]=input.value;
    });
    return(this._formInputValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this._getInputValues(); 
    this.form.addEventListener('submit', this.handleSubmit) //обработчик сабмита формы.
  }

  close() {
    //console.log('закрытие отработало!');
    super.close();
    this.form.reset();
    //console.log("очистка полей сработала"); 

  }
}