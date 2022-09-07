let editButton = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
function showClick() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', showClick);


let closeButton = document.querySelector('.close-button');
function closeClick() {
    popup.classList.remove('popup_opened'); 
}
closeButton.addEventListener('click', closeClick);



//let saveButton = document.querySelector('.save-button');
let profileName = document.querySelector('.profile__name'); //вот переменная, куда загрузим имя
let profileAbout = document.querySelector('.profile__about'); // вот сюда мы загрудим остальную инфу

let formElement = document.querySelector('.form');  //вот переменная с формой

let nameInput = formElement.querySelector('.name'); //поле формы с именем
let jobInput = formElement.querySelector('.about'); //поле формы с доп инфой

function formSubmitHandler (evt) {
    evt.preventDefault(); //отключили стандартную отправку формы
    profileName.textContent = nameInput.value; // сказали "запиши мне в ProfileName содержимое поля с именем"
    profileAbout.textContent = jobInput.value; // то же самое для остальной инфы
    popup.classList.remove('popup_opened'); // "закрой форму"
}
//saveButton.addEventListener('click', formSubmitHandler)
formElement.addEventListener('submit', formSubmitHandler); //при событии "отправка" запускаем функцию редактирования данных




let like = document.querySelector('.like');
/*функция включает и выключает лайк у первой карточки. просто посмотреть, работает ли при изменении свойства 
background-image.  Дя! работает \^-^/  */
function likeClick() {
    like.classList.toggle('like_active');
    }
like.addEventListener('click', likeClick);  