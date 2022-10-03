// зачем-то это дали в задании по проекту. по ходу разберусь, зачем это нужно вообще
/*enableValidation({
    formSelector: '.popup__form',    //form
    inputSelector: '.popup__input',   //form__item
    submitButtonSelector: '.popup__button',   //у меня ткого вообще нема
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',  //form__item_type_error
    errorClass: 'popup__error_visible'   //form__item-error-visible?
  }); */

  const form = document.querySelector('.form');
  const formInput = form.querySelector('.form__item');

  const formError = form.querySelector(`.${formInput.id}-error`);

  //нужна функция, которая подключает стили ошибки
  const showItemError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__item_type_error');    //класс добавляется но не работают стили. пока идем дальше
    //изменяяем текст ошибки
    errorElement.textContent = errorMessage;
    //сообщение об ошибке
    errorElement.classList.add('form__item-error_visible');   // надо в стилях сделать так, чтобы ошибка выводилась нормально, когда у нее длинныый текст
  }
  //функция, которая отключает стили ошибки
  const hideItemError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove('form__item_type_error');
      errorElement.classList.remove('form__item-error_visible');
      //очищаем поле ошибки
      errorElement.textContent = "";
  }
  //нужна функция которая проверяет валидность поля и вызывает функцию с ошибкой
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // Передадим сообщение об ошибке вторым аргументом
      showItemError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideItemError(formElement, inputElement);
    }
  };

  //////////////
  //form.addEventListener('submit', function (evt) {
  //  evt.preventDefault();
  //});
  
  //formInput.addEventListener('input', function () {
   // checkInputValidity(form, formInput);
  //});
 /////////////////////


  function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__item'));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        checkInputValidity(formElement, inputElement);
      });
    });
  }

//  setEventListeners(form);

  //////////////////////////////////////////////
  function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    })
  }

enableValidation();