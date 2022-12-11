//общий класс валидации. Формы две, значит создаем дважды
export default class FormValidator {
  constructor(validationConfig, form){
  this._inputSelector = validationConfig.inputSelector;
  this._submitButtonSelector = validationConfig.submitButtonSelector;
  this._inactiveButtonClass = validationConfig.inactiveButtonClass;
  this._inputErrorClass = validationConfig.inputErrorClass;
  this._errorClass = validationConfig.errorClass;

  this._form = form;
  this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  this._saveButton = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
 
  }

  resetValidation() {
    this._toggleFormBatton();
    this._inputList.forEach((inputElement) => {
      this._hideItemError(inputElement);
    });
  }

  _setEventListeners () {
    this._inputList.forEach((inputElement) => {
      this._hideItemError(inputElement);
      inputElement.addEventListener('input', ()=> {
      this._checkInputValidity(inputElement);
      this._toggleFormBatton();
      });
    });
  }

  _hideItemError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      //очищаем поле ошибки
      errorElement.textContent = "";
  }

  _showItemError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    //изменяяем текст ошибки
    errorElement.textContent = errorMessage;
    //сообщение об ошибке
    errorElement.classList.add(this._errorClass);
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      // Передадим сообщение об ошибке вторым аргументом
      this._showItemError(inputElement, inputElement.validationMessage);
    } else {
      this._hideItemError(inputElement);
    }
  }

  _hasValidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleFormBatton() {
      // Если есть хотя бы один невалидный инпут
    if (this._hasValidInput(this._inputList)) {
        // сделай кнопку неактивной
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.setAttribute('disabled', 'disabled');
    } else {
        // иначе сделай кнопку активной
      this._saveButton.classList.remove(this._inactiveButtonClass);
      this._saveButton.removeAttribute('disabled', 'disabled');
    }
  }
}
