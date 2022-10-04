const editButton = document.querySelector('.edit-button'); //кнопка "редактировать"
const closeButtons = document.querySelectorAll('.close-button'); //кнопка "закрыть форму"
const editProfilePopup = document.querySelector('.popup_edit-profile');  //попап редактирования профиля
const editProfileCloseButton = document.querySelector('.close-button_profile-popup'); //кнопка "закрыть форму редактирования профиля"
const newPlacePopup = document.querySelector('.popup_new-plase'); //попап создания карточек
const newPlaceCloseButton = document.querySelector('.close-button_new-card-popup'); //кнопка "закрыть форму создания карточек"
const bigImagePopup = document.querySelector('.popup_big-image'); //попап с большой картинкой
const bigImageCloseButton = document.querySelector('.close-button_big-image-popup'); //кнопка "закрыть большую картинку"

const elements = document.querySelector('.elements');

const profileName = document.querySelector('.profile__name'); //вот переменная, куда загрузим имя
const profileAbout = document.querySelector('.profile__about'); // вот сюда мы загрудим остальную инфу

const editProfileForm = editProfilePopup.querySelector('.form');  //вот переменная с формой
const createNewPlaseForm = newPlacePopup.querySelector('.form');

const nameInput = editProfileForm.querySelector('.form__item_content_name'); //поле формы с именем
const jobInput = editProfileForm.querySelector('.form__item_content_about'); //поле формы с доп инфой

const cardTemplate = document
  .querySelector('#template-card')
  .content.querySelector('.element'); //болванка для карточек

const placeNameInput = document.querySelector('.form__item_content_plase-name'); //поле формы для создания нового места (название)
const placeLinkInput = document.querySelector('.form__item_content_plase-image');// поле формы для создания нового места (картинка)

const addNewPlaceButton = document.querySelector('.add-button');  // Это кнопка добавления нового места


// общая функция для закрытия через Esc
function closeEscape (evt) {
  if (evt.key ==='Escape') {
  el.closePopup();
  }
};

// общя функция закрытия через клик вне области попапа
function closeFromOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    el.closePopup();
  }
};


//функция открытия формы
function showPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', function(evt) {   // нужно вынести в отдельную функцию. функция есть, но не работает
    if (evt.key ==='Escape') {
      closePopup(el);
    }
  });
  el.addEventListener('mousedown', (evt) => {      // нужно вынести в отдельную функцию. фунгкция есть но не работает
    if (evt.target === evt.currentTarget) {
      closePopup(el);
    };
  });
  
}

//функция закрытия попапа
function closePopup(el) {
  el.classList.remove('popup_opened');
}

//функция сохранения изменений в форме
function SubmitHandlerEditProfileForm (evt) {
  evt.preventDefault(); //отключили стандартную отправку формы
  profileName.textContent = nameInput.value; // сказали "запиши мне в ProfileName содержимое поля с именем"
  profileAbout.textContent = jobInput.value; // то же самое для остальной инфы
  closePopup(editProfilePopup); // вызвали функцию закрытия формы
}

//Функция, кторая делает карточки
function createCard(item) {
  const card = cardTemplate.cloneNode(true); 
  const text = card.querySelector('.element__text');
  const image = card.querySelector('.element__photo');

  text.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  setCardListeners(card);

  return card;
};

// функция, которая также навешивает слушатели и выводит на страницу карточки
function addCard(item) {
  const card =createCard(item);
  elements.prepend(card);
}

//переворачиваем массив
const reverseinitialCards = initialCards.reverse();
// "пролистываем" его, вызывая для каждого элемента функцию создания сарточки и вывода ее на экран
reverseinitialCards.forEach(addCard);

//отправка формы для создания новой карточки
function createNewPlace (evt) {
  evt.preventDefault(); //отключили стандартную отправку формы

  const name = placeNameInput.value;  //забираем из поля формы название
  const link = placeLinkInput.value; // забираем из поля формы адрес картинки

  const newPlase = {name, link}; //создаем массив
  initialCards.unshift(newPlase); //делаем его элементом стартового массива (навсякий случай)
  console.log(initialCards); 

  addCard(newPlase);

  createNewPlaseForm.reset();
  closePopup(newPlacePopup); // вызвали функцию закрытия этой формы
}

//это функция с кнопочками на карточках
function setCardListeners (element) {                                     
//функция любви. отвечает за лайки
  element.querySelector('.like').addEventListener('click', function (evt) {   
    evt.target.classList.toggle('like_active');
  });

//функция, которая удаляет карточки
  element.querySelector('.trash-button').addEventListener('click', function(evt) {    
    element.remove();
  });

//функция place-попап
  element
    .querySelector('.element__photo')
    .addEventListener('click', function(evt) {
      const placeImg= bigImagePopup.querySelector('.popup-image__image');
      const placeInfo= bigImagePopup.querySelector('.popup-image__plase-info');

      placeImg.src = evt.target.src;  //Извините, пожалуйста, Павел.  Вы совершенно правы. 
      placeInfo.textContent = evt.target.alt;
      
      showPopup(bigImagePopup)
    });
}

// Открытие первого окна(редактирование профиля)
editButton.addEventListener('click', ()=> {
  nameInput.value = profileName.textContent; // подгрузили в поля формы нужное имя
  jobInput.value = profileAbout.textContent; // то же самое для остальной инфы

  showPopup(editProfilePopup);
}); 

// Открытие второго попапа (создание карточек)
addNewPlaceButton.addEventListener('click', ()=> showPopup(newPlacePopup)); 

editProfileCloseButton.addEventListener('click', ()=> closePopup(editProfilePopup)); // Закрытие первого попапа

// Закрытие второго попапа (создание карточек)
newPlaceCloseButton.addEventListener('click', ()=>{
 closePopup(newPlacePopup);
 createNewPlaseForm.reset();
}); 

bigImageCloseButton.addEventListener('click', ()=> closePopup(bigImagePopup)); //закрытие окна с увеличенной картинкой                                                                     
editProfileForm.addEventListener('submit', SubmitHandlerEditProfileForm); //при событии "отправка" запускаем функцию редактирования данных
createNewPlaseForm.addEventListener('submit', createNewPlace); // при событии "отправка" создаем новую карточку
