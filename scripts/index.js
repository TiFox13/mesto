


let editButton = document.querySelector('.edit-button'); //кнопка "редактировать"
let closeButtons = document.querySelectorAll('.close-button'); //кнопка "закрыть форму"
let popups = document.querySelectorAll('.popup'); //всплывающее окошко с формой

let profileName = document.querySelector('.profile__name'); //вот переменная, куда загрузим имя
let profileAbout = document.querySelector('.profile__about'); // вот сюда мы загрудим остальную инфу


let formElement = document.querySelector('.form');  //вот переменная с формой
let newPlaseForm = document.querySelector('.new-plase-form');
let nameInput = formElement.querySelector('.form__item_content_name'); //поле формы с именем
let jobInput = formElement.querySelector('.form__item_content_about'); //поле формы с доп инфой


//функция открытия формы
function showClick(index) {
    nameInput.value = profileName.textContent; // подгрузили в поля формы нужное имя
    jobInput.value = profileAbout.textContent; // то же самое для остальной инфы
    popups[index].classList.add('popup_opened');
   }

//функция закрытия формы
function closeClick(index) {
    popups[index].classList.remove('popup_opened');
}

//функция сохранения изменений в форме
function formSubmitHandler (evt) {
    evt.preventDefault(); //отключили стандартную отправку формы
    profileName.textContent = nameInput.value; // сказали "запиши мне в ProfileName содержимое поля с именем"
    profileAbout.textContent = jobInput.value; // то же самое для остальной инфы
    closeClick(0); // вызвали функцию закрытия формы
}





//ПРОЕКТНАЯ РАБОТА 5



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let cardMaket = document.querySelector('template#card');
let element = cardMaket.content;
let elements = document.querySelector('.elements');
function createCard(item) {
  let card = element.cloneNode(true);
  let text = card.querySelector('.element__text');
  let image = card.querySelector('.element__photo');

  text.textContent = item.name;
  image.src = item.link;

  elements.append(card);

  return card;
};

for (let i = 0; i < initialCards.length; i = i + 1) {
createCard(initialCards[i]);

}




let addButton = document.querySelector('.add-button');  // Это кнопка добавления нового места

let name = document.querySelector('.form__item_content_plase-name');
let link = document.querySelector('.form__item_content_plase-image');

function newPlaiseCreate (evt) {
  evt.preventDefault(); //отключили стандартную отправку формы
  const newPlase = {plaseName, plaseImage};
  createCard(newPlase);
  closeClick(1); // вызвали функцию закрытия формы
}

function setListeners () {
card.querySelector('.like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('like_active');});
}


editButton.addEventListener('click', ()=> showClick(0)); // Открытие первого окна
addButton.addEventListener('click', ()=> showClick(1)); // Открытие второго окна
closeButtons[0].addEventListener('click', ()=> closeClick(0));
closeButtons[1].addEventListener('click', ()=> closeClick(1))
formElement.addEventListener('submit', formSubmitHandler); //при событии "отправка" запускаем функцию редактирования данных
newPlaseForm.addEventListener('submit', newPlaiseCreate);


