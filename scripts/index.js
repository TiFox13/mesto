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

const editButton = document.querySelector('.edit-button'); //кнопка "редактировать"
const closeButtons = document.querySelectorAll('.close-button'); //кнопка "закрыть форму"
const popups = document.querySelectorAll('.popup'); //всплывающее окошко с формой

let profileName = document.querySelector('.profile__name'); //вот переменная, куда загрузим имя
let profileAbout = document.querySelector('.profile__about'); // вот сюда мы загрудим остальную инфу


let formElement = document.querySelector('.form');  //вот переменная с формой
let newPlaseForm = document.querySelector('.new-plase-form');
let nameInput = formElement.querySelector('.form__item_content_name'); //поле формы с именем
let jobInput = formElement.querySelector('.form__item_content_about'); //поле формы с доп инфой

let plaseName = document.querySelector ('.form__item_content_plase-name');  //поле формы для нового места
let plaseImage = document.querySelector('.form__item_content_plase-image');  // поле формы для нового места

let cardMaket = document.querySelector('#template-card'); //болванка для карточек
let element = cardMaket.content; //содержимое болванки
const addButton = document.querySelector('.add-button');  // Это кнопка добавления нового места

let popapImg = document.querySelector('.popup-image');




//функция открытия формы
function showClick(index) {
    nameInput.value = profileName.textContent; // подгрузили в поля формы нужное имя
    jobInput.value = profileAbout.textContent; // то же самое для остальной инфы
    popups[index].classList.add('popup_opened');
   }

//функция закрытия попапа
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


//Функция, кторая делает карточки
function createCard(item) {
  let card = element.cloneNode(true);
  let text = card.querySelector('.element__text');
  let image = card.querySelector('.element__photo');

  text.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  setListenersCard(card);

  return card;
};

// функция, которая навешивает леща(простите, слушатели навешивает) и выводит стартовые карточки на страницу
/*function cardPlaserOld(item) {
  let elements = document.querySelector('.elements');
  const card =createCard(item);
  elements.append(card);
}*/
// функция, которая также навешивает слушатели и выводит на страницу, но уже НОВЫЕ карточки, которые добавит пользователь
function addCard(item) {
  let elements = document.querySelector('.elements');
  const card =createCard(item);
  elements.prepend(card);
}

let reverseinitialCards = initialCards.reverse();
//листалка для массива, запрашивает создание и выведение на экран стартовых карточек
//reverseinitialCards.forEach () => {} //пока не знаю, как правильно сделать
for (let i = 0; i < initialCards.length; i = i + 1) {  
  addCard(reverseinitialCards[i]);
}



//отправка формы для создания новой карточки
function createNewPlace (evt) {
  evt.preventDefault(); //отключили стандартную отправку формы
  let name = document.querySelector('.form__item_content_plase-name').value;  //забираем из поля формы название
  let link = document.querySelector('.form__item_content_plase-image').value; // забираем из поля формы адрес картинки
  const newPlase = {name, link}; //создаем массив
  initialCards.unshift(newPlase); //делаем его элементом стартового массива ( навсякий случай)
  addCard(newPlase);
  plaseName.value = '';  //очистили поле
  plaseImage.value =''; //очистили поле
  closeClick(1); // вызвали функцию закрытия этой формы
}




//это функция с кнопочками на карточках
function setListenersCard (element) {           //ЭТА ФУНКЦИЯ РАБОТАЕТ                                
//функция любви. отвечает за лайки
  element.querySelector('.like').addEventListener('click', function (evt) {   
    evt.target.classList.toggle('like_active');});
    
//функция, которая удаляет карточки
element.querySelector('.trash-button').addEventListener('click', function(evt) {      //И ЭТА ТОЖЕ
  let del = evt.target.closest('.element');                               //НАДО ПЕРЕПИВАТЬ ЧеРЕЗ ЗАМЫКАНИЕ. НО ЧТО ТАКОЕ ЗАМЫКАНИЕ?
  del.remove();
});


//функция плейс-попап
element.querySelector('.element__photo').addEventListener('click', function(evt) {
  let plaseImg= popapImg.querySelector('.popup-image__image');
  let plaseInfo= popapImg.querySelector('.popup-image__plase-info');
  plaseImg.src = evt.target.src;  //Извините, пожалуйста, Павел.  Вы совершенно правы. 
  plaseInfo.textContent = evt.target.alt;
  //plaseInfo.textContent = text; //не работает

  popapImg.classList.add('popup_opened');
 })
}


editButton.addEventListener('click', ()=> showClick(0)); // Открытие первого окна(редактирование профиля)
addButton.addEventListener('click', ()=> showClick(1)); // Открытие второго окна (создание карточек)
closeButtons[0].addEventListener('click', ()=> closeClick(0)); // Закрытие первого окна
closeButtons[1].addEventListener('click', ()=> closeClick(1)) // Закрытие второго окна
closeButtons[2].addEventListener('click', ()=> closeClick(2)) //закрытие окна с увеличенной картинкой                                                                     
formElement.addEventListener('submit', formSubmitHandler); //при событии "отправка" запускаем функцию редактирования данных
newPlaseForm.addEventListener('submit', createNewPlace); // при событии "отправка" создаем новую карточку


