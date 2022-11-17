export {bigImagePopup,
        bigImage,
        bigImageName,
        showPopup,
        closePopup,
       }

const bigImagePopup = document.querySelector('.popup_big-image'); //попап с большой картинкой
const bigImage = bigImagePopup.querySelector('.popup-image__image'); // картинка в попапе
const bigImageName = bigImagePopup.querySelector('.popup-image__place-info') // текст в попапе

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



function createCard(item) {
  const card = new Card(item, '#template-card');
  const cardElement = card.render();
  return(cardElement);
}