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
  const hideItemError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(obj.inputErrorClass);        // есть баг. если очстить поле и закрыть попап, то при открытии будет готерь ошибка
      errorElement.classList.remove(obj.errorClass);   //надо чтобы при закрытии попапа удалялись классы ошибок
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

   function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const saveButton = formElement.querySelector(obj.submitButtonSelector);
toggleFormBatton(inputList, saveButton);  //хы. срабатывает один раз.  а надо чтобы при каждом открытии...
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        checkInputValidity(formElement, inputElement);
        toggleFormBatton(inputList, saveButton);
      });
    });
  }


const hasValidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
const toggleFormBatton = (inputList, saveButton) => {
  // Если есть хотя бы один невалидный инпут
  if (hasValidInput(inputList)) {
    // сделай кнопку неактивной
    saveButton.classList.add(obj.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    saveButton.classList.remove(obj.inactiveButtonClass);
  }
}; 

  // чего с этим объектом делать, вообще не понтяно
  function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    })
  }

enableValidation(obj);