import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit, ) {
      super(popupSelector),
      this.handleSubmit = handleSubmit,

      this.form = this.popup.querySelector('.form'),
      this._inputList = Array.from(this.form.querySelectorAll('.form__item'));
      this._saveButton = this.form.querySelector('.save-button');
      this._saveButtonDefValue = this._saveButton.value;
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
        this.handleSubmit(inputs)//обработчик сабмита формы.
      }) 
    }
  
    close() {
      super.close();
      this.form.reset();
    }
    
    // Унесем загрузку сюда. 
    renderLoading(isLoading) {
      if (isLoading) {
        this.changeButtonLoadingOn();
      } else {
        this.changeButtonLoadingOff()
      }
  }


    changeButtonLoadingOn() {
    this._saveButton.value ='Сохранение...';
    }

    changeButtonLoadingOff() {
      this._saveButton.value = this._saveButtonDefValue;
      }
   }