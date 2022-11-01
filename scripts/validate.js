 export const obj = {    //по логике, надо теперь брать кусочки отсюда и с ними
  formSelector: '.form',    //form
  inputSelector: '.form__item',   //form__item
  submitButtonSelector: '.save-button',   //у меня ткого вообще нема
  inactiveButtonClass: 'save-button_inactive',
  inputErrorClass: 'form__item_type_error',  //form__item_type_error
  errorClass: 'form__item-error_visible'   //form__item-error-visible?
}

//общий класс валидации. у него будет двое детей
class FormValidator {
  constructor(obj){
  this.formSelector = obj.formSelector;
  this.inputSelector = obj.inputSelector;
  this.submitButtonSelector = obj.submitButtonSelector;
  this.inactiveButtonClass = obj.inactiveButtonClass;
  this.inputErrorClass = obj.inputErrorClass;
  this.errorClass = obj.errorClass;
  }

  enableValidation() {
    this._setEventListeners();
  }
  _setEventListeners () {
    //console.log("setEventListeners включилась!")
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
  //console.log("hideItemError включилась!")
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this.inputErrorClass);
      errorElement.classList.remove(this.errorClass);
      //очищаем поле ошибки
      errorElement.textContent = "";
  }

  _showItemError = (inputElement, errorMessage) => {
    //console.log("showItemError включилась!")
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    //изменяяем текст ошибки
    errorElement.textContent = errorMessage;
    //сообщение об ошибке
    errorElement.classList.add(this.errorClass);
  }

 _checkInputValidity = (inputElement) => {
  //console.log("checkInputValidity включилась!")
    if (!inputElement.validity.valid) {
      // Передадим сообщение об ошибке вторым аргументом
      this._showItemError(inputElement, inputElement.validationMessage);
    } else {
      this._hideItemError(inputElement);
    }
  }

  _hasValidInput(inputList) {
    //console.log("hasValidInput включилась!")
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleFormBatton(inputList, saveButton) {
    //console.log("toggleFormBatton включилась!")
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

  //экземпляр класса для формы создания карточек
 export class PlaceFormValid extends FormValidator {
  constructor(obj, form) {
    // ключевым словом super вызываем конструктор родительского
    super(obj);
    //добавим нужную нам форму (ее передали из index.js)
    this.formSelector = form;
}
  enableValidation() {
    //все работает одинаково, так что запускаем метод родительского класса
    super._setEventListeners();
  }
}

  //экземпляр класса для формы редактирования профиля
 export class ProfileFormValid extends FormValidator {
  constructor(obj, form) {
    // ключевым словом super вызываем конструктор родительского
    super(obj);
    this.formSelector = form;
  }
  enableValidation() {
    super._setEventListeners();

  }
}
