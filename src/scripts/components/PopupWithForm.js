import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
      super(popupSelector),
      this.handleSubmit = handleSubmit,
      this._loadingButton = this.popup.querySelector('.button-loading')

      this.form = this.popup.querySelector('.form'),
      this._inputList = Array.from(this.form.querySelectorAll('.form__item'));
    }
  
    _getInputValues() {
      this._formInputValues = {};
      this._inputList.forEach(input => {
      this._formInputValues[input.name] = input.value;
      });
      
      return(this._formInputValues);
    }
  
    setEventListeners() {
      super.setEventListeners();
      this.form.addEventListener('submit', (evt) => {
        evt.preventDefault(); 
        const inputs = this._getInputValues();
        this.handleSubmit(inputs, this._loadingButton)
      }) //обработчик сабмита формы.
    }
  
    close() {
      super.close();
      this.form.reset();
    }
  }