// зачем-то это дали в задании по проекту. по ходу разберусь, зачем это нужно вообще
/*enableValidation({
    formSelector: '.popup__form',    //form
    inputSelector: '.popup__input',   //form__item
    submitButtonSelector: '.popup__button',   //у меня ткого вообще нема
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',  //form__item_type_error
    errorClass: 'popup__error_visible'   //form__item-error-visible?
  }); */

  const formElement = document.querySelector('.form');
  const inputElement = formElement.querySelector('.form__item');

  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  //нужна функция, которая подключает стили ошибки
  const showItemError = (input, errorMessage) => {
    input.classList.add('form__item_type_error');    //класс добавляется но не работают стили. пока идем дальше
    //изменяяем текст ошибки
    formError.textContent = errorMessage;
    //сообщение об ошибке
    formError.classList.add('form__item-error_visible');   // надо в стилях сделать так, чтобы ошибка выводилась нормально, когда у нее длинныый текст
  }
  //функция, которая отключает стили ошибки
  const hideItemError = (input) => {
      input.classList.remove('form__item_type_error');
      formError.classList.remove('form__item-error_visible');
      //очищаем поле ошибки
      formError.textContent = "";
  }
  //нужна функция которая проверяет валидность поля и вызывает функцию с ошибкой
  const isValid = () => {
    if (!inputElement.validity.valid) {
      // Передадим сообщение об ошибке вторым аргументом
      showItemError(inputElement, inputElement.validationMessage);
    } else {
      hideItemError(inputElement);
    }
  };

  inputElement.addEventListener('input', function () {
    isValid();
  });


   


