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
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.about'); // Воспользуйтесь инструментом .querySelector()

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}
//saveButton.addEventListener('click', formSubmitHandler)
formElement.addEventListener('submit', formSubmitHandler); 




let like = document.querySelector('.like');
/*функция включает и выключает лайк у первой карточки. просто посмотреть, работает ли при изменении свойства 
background-image.  Дя! работает \^-^/  */
function likeClick() {
    like.classList.toggle('like_active');
    }
like.addEventListener('click', likeClick);  