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
        
} from "./utils/constants.js";

import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithSubmit from './components/PopupWithSubmit.js';

import Api from './components/Api.js';

let userId;
//Создадим экземпляры классов
const profileFormValid = new FormValidator(validationConfig, profileEditForm);
const newPlaceValid = new FormValidator(validationConfig, newPlaceCreateForm);
const newAvatarValid = new FormValidator(validationConfig, newAvatarForm);

const section = new Section({renderer: createCard},  ".elements"); 

const user = new UserInfo( {userName:'.profile__name', userAbout: '.profile__about', avatarImage: '.profile__avatar'})

const imagePopup = new PopupWithImage('.popup_big-image');
const formNewPlacePopup = new PopupWithForm('.popup_new-place', createNewPlace); 
const formEditProfilePopup = new PopupWithForm('.popup_edit-profile', submitHandlerEditProfileForm);

const formNewAvatarPopup = new PopupWithForm('.popup_new-avatar',  submitHandlerEditAvatarForm);
const preDeletePopup = new PopupWithSubmit ('.popup_pre-delete');

const apiConfig = {
url: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: '532cb979-197b-4764-a60b-369a0c33ba6e',
    "Content-type": 'application/json'
  }
};

//подключаем API
const api = new Api(apiConfig);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
.then(([info, allCards]) => {
  user.setUserInfo(info);
  userId = info._id;

  const allCardsReverse = allCards.reverse()
    section.startRender(allCardsReverse)
})
.catch ((error) => {
  console.log(error); // выведем ошибку в консоль
})

imagePopup.setEventListeners();
formNewPlacePopup.setEventListeners();
formEditProfilePopup.setEventListeners();
formNewAvatarPopup.setEventListeners();
preDeletePopup.setEventListeners();

//запустили валидацию
profileFormValid.enableValidation();
newPlaceValid.enableValidation();
newAvatarValid.enableValidation();

//функция, которая делает карточки, создавая объект класса Card
function createCard(item) {
  const card = new Card(
    item,                                             //item (объект для карточки)
    '#template-card',                                //templateSelector
    (link, name) => {imagePopup.open(link, name);},  //handleCardClick 
    (id)=> {                                        //confirmation
      preDeletePopup.open();
      preDeletePopup.changeSubmitHandler(() => {  //submitHandlerPreDelete
        api.deleteCard(id)
        .then((res) => {
          card.trash()
          preDeletePopup.close()
        }) 
        .catch ((error) => {
          console.log(error); // выведем ошибку в консоль
        })
        
      })}, 
    (id) => { //addLike,
      api.putLike(id)                           
      .then((res) => {
        card.onLike();
      })
      .catch ((error) => {
        console.log(error); // выведем ошибку в консоль
      })
    },                    
    (id) => { //deleteLike, 
      api.deleteLike(id)
      .then((res) => {
        card.offLike();
      })
      .catch ((error) => {
        console.log(error); // выведем ошибку в консоль
      })},                 
    userId,
    (element) => element._id === userId,   //compareId
);
  const cardElement = card.render();

  return cardElement;
}

// функция сохранения изменений АВАТАРА    API
function submitHandlerEditAvatarForm(item) {
 formNewAvatarPopup.renderLoading(true);
  api.patchAvatar(item)
  .then((result) => {
    user.setUserInfo(result);
    const newInfo = user.getUserInfo();
    avatarImage.src = newInfo.userAvatar;
  })
  .then (() => {
    formNewAvatarPopup.close()
  })
  .catch ((error) => {
    console.log(error); // выведем ошибку в консоль
  })
  .finally (() => {
    formNewAvatarPopup.renderLoading(false);
  })
}

// функция сохранения изменений в форме    API
function submitHandlerEditProfileForm (item) {
  formEditProfilePopup.renderLoading(true);
  api.patchUserInfo(item)
  .then((result) => {
    user.setUserInfo(result);
    const newInfo = user.getUserInfo();
    nameInput.value = newInfo.userName;
    jobInput.value = newInfo.userAbout;
  })
  .then (() => {
    formEditProfilePopup.close(); // вызвали функцию закрытия формы
  })
  .catch ((error) => {
    console.log(error); // выведем ошибку в консоль
  })
  .finally (() => {
    formEditProfilePopup.renderLoading(false);
  }) 
}

// отправка формы для создания новой карточки   API
function createNewPlace (item) {  
 formNewPlacePopup.renderLoading(true);
  api.addNewCard(item)
  .then((result) => {
    const card = createCard(result); 
    section.addItem(card); 
  })
  .then (() => {
    formNewPlacePopup.close();// вызвали функцию закрытия этой формы
  })
  .catch ((error) => {
    console.log(error); // выведем ошибку в консоль
  })
  .finally (() => {
    formNewPlacePopup.renderLoading(false);
  })
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
