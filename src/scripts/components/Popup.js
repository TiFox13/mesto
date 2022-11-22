export default class Popup {
  constructor(popupSelector){
    this.popup = document.querySelector(popupSelector);
    this.closeButton = this.popup.querySelector('.close-button'); //нашли кнопку закрытия именно этого попапа
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt)); //вешаем слушатель для клика по ESC?
  }

  close() {
    this.popup.classList.remove('popup_opened');
    this.closeButton.removeEventListener('click', this.close);  //слушатель клика иконке закрытия попапа?
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt)); //вешаем слушатель для клика по ESC?
    this.popup.removeEventListener('mousedown', (evt) => this._handleOverlayClose(evt)); // вешаем слушатель для клика по оверлею
  }

//содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key ==='Escape') {
      this.close();
    }
  }

    // метод закрытия через клик вне области попапа
  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };


///////////////////////ПОСЛЕДНЯЯ ОШИБКА В ПОПАПАХ
/////////////////
//////////////
//bind НУЖНО ПЕРЕНЕСТИ КОНСТРУКТОР. но я хз как
  setEventListeners() {
    //console.log("листенер на связи!");
    this.closeButton.addEventListener('click', this.close.bind(this));  //слушатель клика иконке закрытия попапа?
    this.popup.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt)); // вешаем слушатель для клика по оверлею
  }
}
///////////////////
/////////////////////
//////////
