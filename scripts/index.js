let editButton = document.querySelector('.edit-button'); //кнопка "редактировать"
let closeButton = document.querySelector('.close-button'); //кнопка "закрыть форму"
let popup = document.querySelector('.popup'); //всплывающее окошко с формой

let profileName = document.querySelector('.profile__name'); //вот переменная, куда загрузим имя
let profileAbout = document.querySelector('.profile__about'); // вот сюда мы загрудим остальную инфу

let formElement = document.querySelector('.form');  //вот переменная с формой
let nameInput = formElement.querySelector('.form__item_content_name'); //поле формы с именем
let jobInput = formElement.querySelector('.form__item_content_about'); //поле формы с доп инфой


//функция открытия формы
function showClick() {
    nameInput.value = profileName.textContent; // подгрузили в поля формы нужное имя
    jobInput.value = profileAbout.textContent; // то же самое для остальной инфы
    popup.classList.add('popup_opened');
   }

//функция закрытия формы
function closeClick() {
    popup.classList.remove('popup_opened');
}

//функция сохранения изменений в форме
function formSubmitHandler (evt) {
    evt.preventDefault(); //отключили стандартную отправку формы
    profileName.textContent = nameInput.value; // сказали "запиши мне в ProfileName содержимое поля с именем"
    profileAbout.textContent = jobInput.value; // то же самое для остальной инфы
    closeClick(); // вызвали функцию закрытия формы
}


editButton.addEventListener('click', showClick);
closeButton.addEventListener('click', closeClick);
formElement.addEventListener('submit', formSubmitHandler); //при событии "отправка" запускаем функцию редактирования данных


