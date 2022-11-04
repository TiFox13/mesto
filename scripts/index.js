import { obj, PlaceFormValid, ProfileFormValid} from "./validate.js";
import  Card from "./cards.js";
import { initialCards } from "./initialCards.js";
export {showPopup};

const buttonEdit = document.querySelector('.edit-button'); //кнопка "редактировать"
const popupEditProfile = document.querySelector('.popup_edit-profile');  //попап редактирования профиля
const profileEditCloseButton = document.querySelector('.close-button_profile-popup'); //кнопка "закрыть форму редактирования профиля"
const newPlacePopup = document.querySelector('.popup_new-place'); //попап создания карточек
const newPlaceCloseButton = document.querySelector('.close-button_new-card-popup'); //кнопка "закрыть форму создания карточек"
const bigImagePopup = document.querySelector('.popup_big-image'); //попап с большой картинкой
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

const profileFormValid = new ProfileFormValid(obj, profileEditForm);
const newPlaceValid = new PlaceFormValid(obj, newPlaceCreateForm);

//функция, которая делает карточки, создавая объект класса Card
function createCard(item) {
  const someCard = new Card(item, '#template-card');
  const cardElement = someCard.render(item);
  elements.prepend(cardElement);
}
// переворачиваем массив
const initialCardsReverse = initialCards.reverse();
// "пролистываем" его, вызывая для каждого элемента переменную, которая создает объект класса Card
initialCardsReverse.forEach((item) => {
  createCard(item);
});

// общая функция для закрытия через Esc
function closeWithEscape (evt) {
  if (evt.key ==='Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// общая функция закрытия через клик вне области попапа
function closeClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

// функция открытия формы
function showPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEscape); //вешаем слушатель для клика по ESC
  el.addEventListener('mousedown', closeClickOnOverlay); // вешаем слушатель для клика по оверлею
}

// функция закрытия попапа
function closePopup(el) {
  el.classList.remove('popup_opened');
  document.removeEventListener ('keyup', closeWithEscape);
  el.removeEventListener('mousedown', closeClickOnOverlay)
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
  createCard(newPlase);
  closePopup(newPlacePopup); // вызвали функцию закрытия этой формы
}

// функция place-попап

/*someCard._view// БОЛЬШЕ НЕ РАБОТАЕТ.ТК ВЫЗЫВАТЬ НАДО ДРУГУЮ ШТУКУ
    .querySelector('.element__photo')
    .addEventListener('click', (evt)=> {
      console.log("я есть")

      const placeImg= bigImagePopup.querySelector('.popup-image__image');
      const placeInfo= bigImagePopup.querySelector('.popup-image__place-info');

      placeImg.src = evt.target.src;
      placeImg.alt = evt.target.alt;
      placeInfo.textContent = evt.target.alt;

      showPopup(bigImagePopup)
    });
*/

// Открытие первого окна(редактирование профиля)
buttonEdit.addEventListener('click', ()=> {
  nameInput.value = profileName.textContent; // подгрузили в поля формы нужное имя
  jobInput.value = profileAbout.textContent;
  showPopup(popupEditProfile);

//запустили валидацию
  profileFormValid.enableValidation(profileEditForm);
  //setEventListeners(popupEditProfile); // очищаем ошибки и актуализируем состояние кнопки для КОНКРЕТНОГО попапа
});

// Открытие второго попапа (создание карточек)
newPlaceAddButton.addEventListener('click', ()=>  {
  showPopup(newPlacePopup);
  newPlaceCreateForm.reset();

//запустили валидацию
  newPlaceValid.enableValidation(newPlaceCreateForm);
  //setEventListeners(newPlacePopup); // очищаем ошибки и актуализируем состояние кнопки для КОНКРЕТНОГО попапа
});

profileEditCloseButton.addEventListener('click', ()=> closePopup(popupEditProfile)); // Закрытие первого попапа

// Закрытие второго попапа (создание карточек)
newPlaceCloseButton.addEventListener('click', ()=> closePopup(newPlacePopup));

bigImageCloseButton.addEventListener('click', ()=> closePopup(bigImagePopup)); //закрытие окна с увеличенной картинкой
profileEditForm.addEventListener('submit', submitHandlerEditProfileForm); //при событии "отправка" запускаем функцию редактирования данных
newPlaceCreateForm.addEventListener('submit', createNewPlace); // при событии "отправка" создаем новую карточку
