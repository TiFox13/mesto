import  FormValidator from "./FormValidator.js";
import  Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./Popup.js";
import {PopupWithForm} from "./Popup.js"
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


// переворачиваем массив
const initialCardsReverse = initialCards.reverse();


const profileFormValid = new FormValidator(validationConfig, profileEditForm);
const newPlaceValid = new FormValidator(validationConfig, newPlaceCreateForm);
const section = new Section({items: initialCardsReverse, renderer: createCard}, ".elements")

const imagePopup = new PopupWithImage('.popup_big-image');
const formNewPlacePopup = new PopupWithForm('.popup_new-place', createNewPlace);
//запустили валидацию
profileFormValid.enableValidation(profileEditForm);
  newPlaceValid.enableValidation(newPlaceCreateForm);

section.startRender();

//функция, которая делает карточки, создавая объект класса Card
export function createCard(item) {
  const card = new Card(item, '#template-card',  handleCardClick);
  const cardElement = card.render();
  return(cardElement);
}
/*
//функция, которая добавляет карточки в DOM
function addCard(el) {
  elements.prepend(el);
}



// "пролистываем" его, вызывая для каждого элемента переменную, которая создает объект класса Card
initialCardsReverse.forEach((item) => {
  addCard(createCard(item));
});
*/

//должна вызывать попап при клике на карточку ( передается в Card)
function handleCardClick(link, name) {
  const imageToClick = this._view.querySelector('.element__photo');
  imageToClick.addEventListener('click', () => {
   //const placeName = evt.target.alt;
  // console.log('ну кликнул ты')
   //const link = evt.target.src;
    imagePopup.open(link, name);
  });

}

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
  section.render(newPlase);
  formNewPlacePopup.close()
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
  formNewPlacePopup.open()
  //newPlaceCreateForm.reset();

// спрятали ошибки
  newPlaceValid.resetValidation();
});

profileEditCloseButton.addEventListener('click', ()=> closePopup(popupEditProfile)); // Закрытие первого попапа

// Закрытие второго попапа (создание карточек)
newPlaceCloseButton.addEventListener('click', ()=> closePopup(newPlacePopup));

//bigImageCloseButton.addEventListener('click', ()=> closePopup(bigImagePopup)); //закрытие окна с увеличенной картинкой
profileEditForm.addEventListener('submit', submitHandlerEditProfileForm); //при событии "отправка" запускаем функцию редактирования данных
newPlaceCreateForm.addEventListener('submit', createNewPlace); // при событии "отправка" создаем новую карточку
