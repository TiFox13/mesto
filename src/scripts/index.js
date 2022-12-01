import { images } from './utils/constants.js';
import '../pages/index.css';

import { validationConfig,
        buttonEdit,
        profileEditForm,
        newPlaceCreateForm,
        newAvatarForm,
        nameInput,
        jobInput,
        newPlaceAddButton,
        avatarEditbutton,
        avatarImage,
        initialCardsReverse
} from "./utils/constants.js";

import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';

import Api from './Api.js';


//Создадим экземпляры классов
const profileFormValid = new FormValidator(validationConfig, profileEditForm);
const newPlaceValid = new FormValidator(validationConfig, newPlaceCreateForm);
const newAvatarValid = new FormValidator(validationConfig, newAvatarForm);
const section = new Section({items: initialCardsReverse, renderer: createCard}, ".elements"); 

const user = new UserInfo( {userName:'.profile__name', userAbout: '.profile__about'})

const imagePopup = new PopupWithImage('.popup_big-image');
const formNewPlacePopup = new PopupWithForm('.popup_new-place', createNewPlace); 
const formEditProfilePopup = new PopupWithForm('.popup_edit-profile', submitHandlerEditProfileForm);

///////////////////////
const formNewAvatarPopup = new PopupWithForm('.popup_new-avatar',  submitHandlerEditAvatarForm)
const preDeletePopup = new PopupWithForm ('.popup_pre-delete', submitHandlerPreDelete)
//подключаем API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',//сюда вот надо МОЙ токен
    'Content-Type': 'application/json'
  }
});
////////////////////////

section.startRender();

imagePopup.setEventListeners();
formNewPlacePopup.setEventListeners();
formEditProfilePopup.setEventListeners();
formNewAvatarPopup.setEventListeners();
preDeletePopup.setEventListeners();

//запустили валидацию
profileFormValid.enableValidation(profileEditForm);
newPlaceValid.enableValidation(newPlaceCreateForm);
newAvatarValid.enableValidation(newAvatarForm);


//функция, которая делает карточки, создавая объект класса Card
export function createCard(item) {
  const card = new Card(item, '#template-card',  handleCardClick, confirmation);
  const cardElement = card.render();
  return cardElement;
}

//должна вызывать попап при клике на карточку ( передается в Card)
function handleCardClick(link, name) {
    imagePopup.open(link, name);
}

function confirmation() {
  preDeletePopup.open();
}

function submitHandlerPreDelete() {   //эта фигня должна закрывать попап и вызывать API метод удаления карточки. сейчас она этого не делает. научим!

}

// функция сохранения изменений АВАТАРА
function submitHandlerEditAvatarForm(item) {
  avatarImage.src = item.link;
  formNewAvatarPopup.close()
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
  const userInfo = user.getUserInfo()
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userAbout;

  formEditProfilePopup.open();
  profileFormValid.resetValidation();//спрятали ошибки
});

// Открытие второго попапа (создание карточек)
newPlaceAddButton.addEventListener('click', ()=>  {
  formNewPlacePopup.open();
  newPlaceValid.resetValidation();// спрятали ошибки
});

//открытие третьего попапа(изменение аватара)
avatarEditbutton.addEventListener('click', () =>{
formNewAvatarPopup.open();
newAvatarValid.resetValidation()
})

