export default class Popup {
  constructor(popupSelector){
    this.popup = document.querySelector(popupSelector);
    this.closeButton = this.popup.querySelector('.close-button'); //нашли кнопку закрытия именно этого попапа
    this._closeFunction = this.close.bind(this);
    this._escClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escClose); //вешаем слушатель для клика по ESC?
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escClose); //вешаем слушатель для клика по ESC?
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

  setEventListeners() {
    this.closeButton.addEventListener('click', this._closeFunction);  //слушатель клика иконке закрытия попапа
    this.popup.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt)); // вешаем слушатель для клика по оверлею
  }
}

