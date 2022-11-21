// вебпак добавит в переменные правильные пути
/*import logoImage from './images/header-logo.svg';
import avatar from './images/avatar.jpg';
import trash from './images/Trash.svg';
import plus from './images/+.svg';
import closeIcon from './images/Close-Icon.svg';
import editIcon from './images/Edit-Button.svg';
import likeIcon from './images/like.svg';
import likeActiveIcon from './images/like-active.svg';


const images = [
  // меняем исходные пути на переменные
  { name: 'logoImage', image: logoImage },
  { name: 'avatar', link: avatar },
  { name: 'trash', link: trash },
  { name: 'plus', link: plus },
  { name: 'closeIcon', link: closeIcon },
  { name: 'editIcon', link: editIcon },
  { name: 'likeIcon', image: likeIcon },
  { name: 'likeActiveIcon', link: likeActiveIcon },
]; 

import './pages/index.css';
*/
import { validationConfig, initialCards} from "./utils/constants.js";

import  FormValidator from "./components/FormValidator.js";
import  Card from "./components/Card.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import {PopupWithForm, PopupWithImage} from "./components/Popup.js"

const buttonEdit = document.querySelector('.edit-button'); //кнопка "редактировать"
const popupEditProfile = document.querySelector('.popup_edit-profile');  //попап редактирования профиля
//const profileEditCloseButton = document.querySelector('.close-button_profile-popup'); //кнопка "закрыть форму редактирования профиля"
const newPlacePopup = document.querySelector('.popup_new-place'); //попап создания карточек
//const newPlaceCloseButton = document.querySelector('.close-button_new-card-popup'); //кнопка "закрыть форму создания карточек"
//const bigImageCloseButton = document.querySelector('.close-button_big-image-popup'); //кнопка "закрыть большую картинку"
//const elements = document.querySelector('.elements');
//const profileName = document.querySelector('.profile__name'); //вот переменная, куда загрузим имя
//const profileAbout = document.querySelector('.profile__about'); // вот сюда мы загрудим остальную инфу
const profileEditForm = popupEditProfile.querySelector('.form');  //вот переменная с формой
const newPlaceCreateForm = newPlacePopup.querySelector('.form');
const nameInput = profileEditForm.querySelector('.form__item_content_name'); //поле формы с именем
const jobInput = profileEditForm.querySelector('.form__item_content_about'); //поле формы с доп инфой
const placeNameInput = document.querySelector('.form__item_content_place-name'); //поле формы для создания нового места (название)
const placeLinkInput = document.querySelector('.form__item_content_place-image');// поле формы для создания нового места (картинка)

const newPlaceAddButton = document.querySelector('.add-button');  // Это кнопка добавления нового места

const userInfo ={name: nameInput, about: jobInput};
// переворачиваем массив
const initialCardsReverse = initialCards.reverse();

//Создадим экземпляры классов
const profileFormValid = new FormValidator(validationConfig, profileEditForm);
const newPlaceValid = new FormValidator(validationConfig, newPlaceCreateForm);
const section = new Section({items: initialCardsReverse, renderer: createCard}, ".elements");
const user = new UserInfo( {userName:'.profile__name', userAbout: '.profile__about'})

const imagePopup = new PopupWithImage('.popup_big-image');
const formNewPlacePopup = new PopupWithForm('.popup_new-place', createNewPlace);
const formEditProfilePopup = new PopupWithForm('.popup_edit-profile', submitHandlerEditProfileForm)

//запустили валидацию
profileFormValid.enableValidation(profileEditForm);
  newPlaceValid.enableValidation(newPlaceCreateForm);

//Создали стартовые карточки
section.startRender();

//функция, которая делает карточки, создавая объект класса Card
export function createCard(item) {
  const card = new Card(item, '#template-card',  handleCardClick);
  const cardElement = card.render();
  return(cardElement);
}

//должна вызывать попап при клике на карточку ( передается в Card)
function handleCardClick(link, name) {
  const imageToClick = this._view.querySelector('.element__photo');
  imageToClick.addEventListener('click', () => {
    imagePopup.open(link, name);
  });
}

// функция сохранения изменений в форме
function submitHandlerEditProfileForm (evt) {
  evt.preventDefault();
  user.setUserInfo(userInfo);
  formEditProfilePopup.close(); // вызвали функцию закрытия формы
}

// отправка формы для создания новой карточки
function createNewPlace (evt) {  
  evt.preventDefault();
  const name = placeNameInput.value;  //забираем из поля формы название
  const link = placeLinkInput.value; // забираем из поля формы адрес картинки

  const newPlase = {name, link}; //создаем массив
  //вызываем метод объекта класса Card который отрисует нам новую карточку
  section.render(newPlase);
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
