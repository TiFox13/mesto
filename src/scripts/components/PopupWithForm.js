import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
      super(popupSelector),
      this.handleSubmit = handleSubmit,
      //должен принимать еще колбек сабмита формы
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
    console.log(inputs)
        this.handleSubmit(inputs)
      }) //обработчик сабмита формы.
    }
  
    close() {
      super.close();
      this.form.reset();
    }
  }