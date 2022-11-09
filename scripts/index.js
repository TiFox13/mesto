import  FormValidator from "./FormValidator.js";
import  Card from "./Card.js";
import { validationConfig} from "./utils/constants.js";
import { initialCards } from "./initialCards.js";
import {bigImagePopup,
        showPopup,
        closePopup,
        } from "./utils/utils.js"

const buttonEdit = document.querySelector('.edit-button'); //кнопка "редактировать"
const popupEditProfile = document.querySelector('.popup_edit-profile');  //попап редактирования профиля
const profileEditCloseButton = document.querySelector('.close-button_profile-popup'); //кнопка "закрыть форму редактирования профиля"
const newPlacePopup = document.querySelector('.popup_new-place'); //попап создания карточек
const newPlaceCloseButton = document.querySelector('.close-button_new-card-popup'); //кнопка "закрыть форму создания карточек"
const bigImageCloseButton = document.querySelector('.close-button_big-image-popup'); //кнопка "закрыть большую картинку"
const elements = document.querySelector('.elements');
const profileName = document.querySelector('.profile__name'); //вот переменная, куда загрузим имя
const profileAbout = document.querySelector('.profile__about'); // вот сюда мы загрудим остальную инфу
const profileEditForm = popupEditProfile.querySelector('.form');  //вот переменная с формой
const newPlaceCreateForm = newPlacePopup.querySelector('.form');
const nameInput = profileEditForm.querySelector('.form__item_content_name'); //поле формы с именем
const jobInput = profileEditForm.querySelector('.form__item_content_about'); //поле формы с доп инфой
const placeNameInput = document.querySelector('.form__item_content_place-name'); //поле формы для создания нового места (название)
const placeLinkInput = document.querySelector('.form__item_content_place-image');// поле формы для создания нового места (картинка)

const newPlaceAddButton = document.querySelector('.add-button');  // Это кнопка добавления нового места

const profileFormValid = new FormValidator(validationConfig, profileEditForm);
const newPlaceValid = new FormValidator(validationConfig, newPlaceCreateForm);
//запустили валидацию
profileFormValid.enableValidation(profileEditForm);
  newPlaceValid.enableValidation(newPlaceCreateForm);

//функция, которая делает карточки, создавая объект класса Card
function createCard(item) {
  const card = new Card(item, '#template-card');
  const cardElement = card.render();
  return(cardElement);
}

//функция, которая добавляет карточки в DOM
function addCard(el) {
  elements.prepend(el);
}

// переворачиваем массив
const initialCardsReverse = initialCards.reverse();
// "пролистываем" его, вызывая для каждого элемента переменную, которая создает объект класса Card
initialCardsReverse.forEach((item) => {
  addCard(createCard(item));
});

// функция сохранения изменений в форме
function submitHandlerEditProfileForm (evt) {
  evt.preventDefault(); //отключили стандартную отправку формы
  profileName.textContent = nameInput.value; // сказали "запиши мне в ProfileName содержимое поля с именем"
  profileAbout.textContent = jobInput.value; // то же самое для остальной инфы
  closePopup(popupEditProfile); // вызвали функцию закрытия формы
}

// отправка формы для создания новой карточки
function createNewPlace (evt) {
  evt.preventDefault(); //отключили стандартную отправку формы

  const name = placeNameInput.value;  //забираем из поля формы название
  const link = placeLinkInput.value; // забираем из поля формы адрес картинки

  const newPlase = {name, link}; //создаем массив
  //вызываем метод объекта класса Card который отрисует нам новую карточку
  addCard(createCard(newPlase));
  closePopup(newPlacePopup); // вызвали функцию закрытия этой формы
}

// Открытие первого окна(редактирование профиля)
buttonEdit.addEventListener('click', ()=> {
  nameInput.value = profileName.textContent; // подгрузили в поля формы нужное имя
  jobInput.value = profileAbout.textContent;
  showPopup(popupEditProfile);

//спрятали ошибки
profileFormValid.resetValidation();
});

// Открытие второго попапа (создание карточек)
newPlaceAddButton.addEventListener('click', ()=>  {
  showPopup(newPlacePopup);
  newPlaceCreateForm.reset();

// спрятали ошшибки
  newPlaceValid.resetValidation();
});

profileEditCloseButton.addEventListener('click', ()=> closePopup(popupEditProfile)); // Закрытие первого попапа

// Закрытие второго попапа (создание карточек)
newPlaceCloseButton.addEventListener('click', ()=> closePopup(newPlacePopup));

bigImageCloseButton.addEventListener('click', ()=> closePopup(bigImagePopup)); //закрытие окна с увеличенной картинкой
profileEditForm.addEventListener('submit', submitHandlerEditProfileForm); //при событии "отправка" запускаем функцию редактирования данных
newPlaceCreateForm.addEventListener('submit', createNewPlace); // при событии "отправка" создаем новую карточку
