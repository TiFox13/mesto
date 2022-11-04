//общий класс валидации. у него будет двое детей
export default class FormValidator {
  constructor(validationConfig, form){
  this.inputSelector = validationConfig.inputSelector;
  this.submitButtonSelector = validationConfig.submitButtonSelector;
  this.inactiveButtonClass = validationConfig.inactiveButtonClass;
  this.inputErrorClass = validationConfig.inputErrorClass;
  this.errorClass = validationConfig.errorClass;

  this.formSelector = form;
  }

  enableValidation() {
    this._setEventListeners();
  }
  _setEventListeners () {
    const inputList = Array.from(this.formSelector.querySelectorAll(this.inputSelector));
    const saveButton = this.formSelector.querySelector(this.submitButtonSelector);
    this._toggleFormBatton(inputList, saveButton);
    inputList.forEach((inputElement) => {
      this._hideItemError(inputElement);
      inputElement.addEventListener('input', ()=> {
      this._checkInputValidity(inputElement);
      this._toggleFormBatton(inputList, saveButton);
      });
    });
  }

 _hideItemError(inputElement) {
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this.inputErrorClass);
      errorElement.classList.remove(this.errorClass);
      //очищаем поле ошибки
      errorElement.textContent = "";
  }

  _showItemError = (inputElement, errorMessage) => {
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    //изменяяем текст ошибки
    errorElement.textContent = errorMessage;
    //сообщение об ошибке
    errorElement.classList.add(this.errorClass);
  }

 _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      // Передадим сообщение об ошибке вторым аргументом
      this._showItemError(inputElement, inputElement.validationMessage);
    } else {
      this._hideItemError(inputElement);
    }
  }

  _hasValidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleFormBatton(inputList, saveButton) {
      // Если есть хотя бы один невалидный инпут
      if (this._hasValidInput(inputList)) {
        // сделай кнопку неактивной
        saveButton.classList.add(this.inactiveButtonClass);
        saveButton.setAttribute('disabled', 'disabled');
      } else {
        // иначе сделай кнопку активной
        saveButton.classList.remove(this.inactiveButtonClass);
        saveButton.removeAttribute('disabled', 'disabled');
      }
    }
  }
