class Popup {
  constructor(popupSelector){
    this.popupSelector = popupSelector;
    this.closeButton = popupSelector.querySelector('.close-button') //нашли кнопку закрытия именно этого попапа
  }

  open() {
    el.classList.add('popup_opened');
    el._setEventListeners();
  }

  close() {
  el.classList.remove('popup_opened');
  }

//содержит логику закрытия попапа клавишей Esc
  _handleEscClose() {
    if (evt.key ==='Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
  }
  }

  _setEventListeners() {
    this.closeButton.addEventListener('click', this.close())  //слушатель клика иконке закрытия попапа?

    window.addEventListener('keydown', this._handleEscClose()); //вешаем слушатель для клика по ESC?
 //По идее надо еще закрытие по клику вне области попапа?
  //el.addEventListener('mousedown', closeClickOnOverlay); // вешаем слушатель для клика по оверлею
  }


}





/*
class PopupWithImage extends Popup {
  constructor(){
    super(popupSelector);//не помню, как правильно писать, надо читать теорию
  }

  open() {
    super(open) {
      //ВОТ ТУТЬ! нужно вставлять в попап картинку и атрибут src изображения.
      /* const imageToClick = this._view.querySelector('.element__photo');
    imageToClick.addEventListener('click', () => {

      bigImage.src = this._link;
      bigImageName.textContent = this._name;
      super(open);
    }
  }
}
*/
class PopupWithForm extends Popup {
  constructor(call, popupSelector) {
    super(popupSelector),
    this.call = call
    //должен принимать еще колбек сабмита формы
    this.formSelector = this.popupSelector.querySelector('.form');
  }

  _getInputValues() {
    //который собирает данные всех полей формы.
  }

  _setEventListeners() {
    super._setEventListeners();
    //но и добавлять обработчик сабмита формы.
    this.call.//дальше должен идти обработчик
  }

  close() {
    super(close);
    this.formSelector.reset()
    //при закрытии попапа форма должна ещё и сбрасываться.
  }
}

