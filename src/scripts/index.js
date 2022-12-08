//осталось сделать
//\\ удаление думм элемента карточки, когда она удаляется api запросом ( а она удаляется, да!)
// поработать с отправкой инфы о лайках и отображении этих изменений в думм
// начать НОРМАЛЬНО передавать id пользователя ( а не вручную, как я)
// добавить режимы ожидания на кнопки попапов
// отрефакторить код, а то я уже ничего в нем не понимаю!

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


//Создадим экземпляры классов
const profileFormValid = new FormValidator(validationConfig, profileEditForm);
const newPlaceValid = new FormValidator(validationConfig, newPlaceCreateForm);
const newAvatarValid = new FormValidator(validationConfig, newAvatarForm);

const section = new Section({renderer: createCard}, ".elements"); 

const user = new UserInfo( {userName:'.profile__name', userAbout: '.profile__about'})

const imagePopup = new PopupWithImage('.popup_big-image');
const formNewPlacePopup = new PopupWithForm('.popup_new-place', createNewPlace, renderLoading); 
const formEditProfilePopup = new PopupWithForm('.popup_edit-profile', submitHandlerEditProfileForm, renderLoading);

const formNewAvatarPopup = new PopupWithForm('.popup_new-avatar',  submitHandlerEditAvatarForm, renderLoading);
const preDeletePopup = new PopupWithSubmit ('.popup_pre-delete', submitHandlerPreDelete);


const apiConfig = {
url: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: '532cb979-197b-4764-a60b-369a0c33ba6e',
    "Content-type": 'application/json'
  }
}


// пока прикрутим так. очень хочу удалить эту дурацкую
//const myId = "638f3d8bebd3b31ab4e7a99b";


//подключаем API
const api = new Api(apiConfig)
 // где-то тут должны с сервера подгружаться данные профиля. но они не грузятся. но на сервер отправились, да
api.getUserInfo()
.then ((result) => {
  user.setUserInfo(result);
 // avatarImage.src = result.avatar;
 // const myId = result._id;
 // console.log(myId)
})

api.getInitialCards()
.then((result) => {
  api.getUserInfo()
    .then ((user) => {
      console.log(user)
  result.forEach((item) => {
  section.startRender(item, user)
  })
})
})

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
function createCard(item, user) {
  console.log(item)
  const card = new Card(item, '#template-card',  handleCardClick, confirmation, addLike, deleteLike);
  const cardElement = card.render(user, {compareId: (element)=> {     ///ПО ИДЕЕ. ЭТУ ХРЕНЬ НАДО УНЕСТИ ОТСЮДА В ИНДЕКС!
    return element._id === user._id
 }});
  
  return cardElement;
}


//должна вызывать попап при клике на карточку ( передается в Card)
function handleCardClick(link, name) {
    imagePopup.open(link, name);
}

function confirmation(id, card) {
  preDeletePopup.open(id, card);
}

function submitHandlerPreDelete(id, card) {   // закрыть попап и вызвать API метод удаления карточки. 
api.deleteCard(id);
deleteCard(card)
preDeletePopup.close()
}

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ ИЗ ДУММ
function deleteCard(card) {
  card.remove();
}

//Как поставить этой фотке лайк?!
function addLike(id) {
  api.putLike(id);
}
// А как удалить?!
function deleteLike(id) {
api.deleteLike(id);
}

//рекламная пауза, так сказать    А ВОТ КАК ПОНЯТЬ, ОНО РАБОТАЕТ ИЛИ НЕ РАБОТАЕТ?!
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.value = "Сохранение...";
  } 

}

// функция сохранения изменений АВАТАРА    API
function submitHandlerEditAvatarForm(item) {
  api.patchAvatar(item)
  .then((result) => {
    avatarImage.src = result.avatar;
  })
 formNewAvatarPopup.close()
}


// функция сохранения изменений в форме    API
function submitHandlerEditProfileForm (item) {

api.patchUserInfo(item)
.then((result) => {
  user.setUserInfo(result);
  nameInput.value = result.name;
   jobInput.value = result.about;
 })

  formEditProfilePopup.close(); // вызвали функцию закрытия формы
}

// отправка формы для создания новой карточки   API
function createNewPlace (item) {  
api.addNewCard(item)
.then((result) => {
 section.startRender(result)
})

  formNewPlacePopup.close();// вызвали функцию закрытия этой формы
}

// Открытие первого окна(редактирование профиля)
buttonEdit.addEventListener('click', ()=> {
  api.getUserInfo()
    .then ((result) => {
      nameInput.value = result.name;
      jobInput.value = result.about;
    })

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

