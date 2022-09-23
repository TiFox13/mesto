
const editButton = document.querySelector('.edit-button'); //кнопка "редактировать"
const closeButtons = document.querySelectorAll('.close-button'); //кнопка "закрыть форму"
//const popups = document.querySelectorAll('.popup'); //всплывающее окошко с формой

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

//let popapImg = document.querySelector('.popup-image'); надо убрать за нендобностью
let p1 = document.querySelector('.popup_edit-profile');
let cb1 = document.querySelector('.close-button_profile-popup');
let p2 = document.querySelector('.popup_new-plase');
let cb2 = document.querySelector('.close-button_new-card-popup');
let p3 = document.querySelector('.popup_big-image');
let cb3 = document.querySelector('.close-button_big-image-popup');

//функция открытия формы
function showClick(el) {
     el.classList.add('popup_opened');
   }

//функция закрытия попапа
function closeClick(el) {
    el.classList.remove('popup_opened');
}

//функция сохранения изменений в форме
function formSubmitHandler (evt) {
    evt.preventDefault(); //отключили стандартную отправку формы
    profileName.textContent = nameInput.value; // сказали "запиши мне в ProfileName содержимое поля с именем"
    profileAbout.textContent = jobInput.value; // то же самое для остальной инфы
    closeClick(p1); // вызвали функцию закрытия формы
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
  closeClick(p2); // вызвали функцию закрытия этой формы
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

editButton.addEventListener('click', ()=> {
  nameInput.value = profileName.textContent; // подгрузили в поля формы нужное имя
  jobInput.value = profileAbout.textContent; // то же самое для остальной инфы
  showClick(p1);
}); // Открытие первого окна(редактирование профиля)


addButton.addEventListener('click', ()=> {
  plaseName.value = '';  //очистили поле
  plaseImage.value =''; //очистили поле
 showClick(p2);
}); // Открытие второго окна (создание карточек)
cb1.addEventListener('click', ()=> closeClick(p1)); // Закрытие первого окна
cb2.addEventListener('click', ()=> closeClick(p2)) // Закрытие второго окна
cb3.addEventListener('click', ()=> closeClick(p3)) //закрытие окна с увеличенной картинкой                                                                     
formElement.addEventListener('submit', formSubmitHandler); //при событии "отправка" запускаем функцию редактирования данных
newPlaseForm.addEventListener('submit', createNewPlace); // при событии "отправка" создаем новую карточку


