import { images } from './utils/constants.js';
import '../pages/index.css';

import { validationConfig, initialCards} from "./utils/constants.js";

import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';

const buttonEdit = document.querySelector('.edit-button'); //кнопка "редактировать"
const popupEditProfile = document.querySelector('.popup_edit-profile');  //попап редактирования профиля

const newPlacePopup = document.querySelector('.popup_new-place'); //попап создания карточек

const profileEditForm = popupEditProfile.querySelector('.form');  //вот переменная с формой
const newPlaceCreateForm = newPlacePopup.querySelector('.form');
const nameInput = profileEditForm.querySelector('.form__item_content_name'); //поле формы с именем
const jobInput = profileEditForm.querySelector('.form__item_content_about'); //поле формы с доп инфой
const placeNameInput = document.querySelector('.form__item_content_place-name'); //поле формы для создания нового места (название)
const placeLinkInput = document.querySelector('.form__item_content_place-image');// поле формы для создания нового места (картинка)

const newPlaceAddButton = document.querySelector('.add-button');  // Это кнопка добавления нового места

// переворачиваем массив
const initialCardsReverse = initialCards.reverse();

//Создадим экземпляры классов
const profileFormValid = new FormValidator(validationConfig, profileEditForm);
const newPlaceValid = new FormValidator(validationConfig, newPlaceCreateForm);
const section = new Section({items: initialCardsReverse, renderer: createCard}, ".elements"); 

section.startRender();
/*const section = new Section({
  items: initialCardsReverse, 
  renderer: (item)=> {
    const card = new Card(item, '#template-card',  handleCardClick);
    const cardElement = card.render();
    return cardElement;
  }}, ".elements");*/

const user = new UserInfo( {userName:'.profile__name', userAbout: '.profile__about'})

const imagePopup = new PopupWithImage('.popup_big-image');
const formNewPlacePopup = new PopupWithForm('.popup_new-place', createNewPlace); 
const formEditProfilePopup = new PopupWithForm('.popup_edit-profile', submitHandlerEditProfileForm);

imagePopup.setEventListeners();
formNewPlacePopup.setEventListeners();
formEditProfilePopup.setEventListeners();

/*const formNewPlacePopup = new PopupWithForm({    //то же самое, что и строчки выше, но  без внешней функции. функция описывается прямо при передаче
  popupSelector: '.popup_new-place', 
  submitHandler: (evt) => {  
    evt.preventDefault();
    const name = placeNameInput.value;  //забираем из поля формы название
    const link = placeLinkInput.value; // забираем из поля формы адрес картинки
  
    const newPlase = {name, link}; //создаем массив
    //вызываем метод объекта класса Card который отрисует нам новую карточку
    section.render(newPlase);
    formNewPlacePopup.close();// вызвали функцию закрытия этой формы
     }
  });

const formEditProfilePopup = new PopupWithForm({
  popupSelector: '.popup_edit-profile', 
  submitHandler: (evt) => {
    evt.preventDefault();
    user.setUserInfo(userInfo);
    formEditProfilePopup.close(); // вызвали функцию закрытия формы
  }
})*/

//запустили валидацию
profileFormValid.enableValidation(profileEditForm);
  newPlaceValid.enableValidation(newPlaceCreateForm);

//функция, которая делает карточки, создавая объект класса Card
export function createCard(item) {
  console.log("фабрика карточек запустилась")
  const card = new Card(item, '#template-card',  handleCardClick);
  const cardElement = card.render();
  return cardElement;

}

//должна вызывать попап при клике на карточку ( передается в Card)
function handleCardClick(link, name) {
    imagePopup.open(link, name);
}

// функция сохранения изменений в форме
function submitHandlerEditProfileForm (item) {
  user.setUserInfo(item);
  formEditProfilePopup.close(); // вызвали функцию закрытия формы
}

// отправка формы для создания новой карточки
function createNewPlace (item) {  
  const card = createCard(item);
  section.addItem(card);

  formNewPlacePopup.close();// вызвали функцию закрытия этой формы
   
}

// Открытие первого окна(редактирование профиля)
buttonEdit.addEventListener('click', ()=> {
  
  nameInput.value = user.getUserInfo().userName;
  jobInput.value = user.getUserInfo().userAbout;

  formEditProfilePopup.open();
  profileFormValid.resetValidation();//спрятали ошибки
});

// Открытие второго попапа (создание карточек)
newPlaceAddButton.addEventListener('click', ()=>  {
  formNewPlacePopup.open();
  newPlaceValid.resetValidation();// спрятали ошибки
});

