const obj = {    //по логике, надо теперь брать кусочки отсюда и с ними
  formSelector: '.form',    //form
  inputSelector: '.form__item',   //form__item
  submitButtonSelector: '.save-button',   //у меня ткого вообще нема
  inactiveButtonClass: 'save-button_inactive',
  inputErrorClass: 'form__item_type_error',  //form__item_type_error
  errorClass: 'form__item-error_visible'   //form__item-error-visible?
}

  //нужна функция, которая подключает стили ошибки
  const showItemError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);    
    //изменяяем текст ошибки
    errorElement.textContent = errorMessage;
    //сообщение об ошибке
    errorElement.classList.add(obj.errorClass); 
  }
  //функция, которая отключает стили ошибки
  export function hideItemError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(obj.inputErrorClass);  
      errorElement.classList.remove(obj.errorClass);  
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

export function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const saveButton = formElement.querySelector(obj.submitButtonSelector);
    toggleFormBatton(inputList, saveButton);  
    inputList.forEach((inputElement) => {
      hideItemError(formElement, inputElement);  //тк. функцию вызываем при открытии формы, то сначала прячем ошибки от прошлого взаимодействия с пользователем
      inputElement.addEventListener('input', function() {
        checkInputValidity(formElement, inputElement);
        toggleFormBatton(inputList, saveButton);
      });
    });
  }

export function hasValidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
export function toggleFormBatton(inputList, saveButton) {
  // Если есть хотя бы один невалидный инпут
  if (hasValidInput(inputList)) {
    // сделай кнопку неактивной
    saveButton.classList.add(obj.inactiveButtonClass);
    saveButton.setAttribute('disabled', 'disabled');
  } else {
    // иначе сделай кнопку активной
    saveButton.classList.remove(obj.inactiveButtonClass);
    saveButton.removeAttribute('disabled', 'disabled');
  }
}; 

  // чего с этим объектом делать, вообще не понтяно
  function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
     /* formElement.addEventListener('submit', (evt) => {  // это нам тут не над
        evt.preventDefault();          // мы это уже отключили в функции отправки формы
      });*/
      setEventListeners(formElement);
    })
  }

enableValidation(obj);