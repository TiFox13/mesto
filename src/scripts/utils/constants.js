export const validationConfig = {
  formSelector: '.form',    //form
  inputSelector: '.form__item',   //form__item
  submitButtonSelector: '.save-button',   //у меня ткого вообще нема
  inactiveButtonClass: 'save-button_inactive',
  inputErrorClass: 'form__item_type_error',  //form__item_type_error
  errorClass: 'form__item-error_visible'   //form__item-error-visible?
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// вебпак добавит в переменные правильные пути
import logoImage from '../../images/header-logo.svg';
import avatar from '../../images/avatar.jpg';
import trash from '../../images/Trash.svg';
import plus from '../../images/+.svg';
import closeIcon from '../../images/Close-Icon.svg';
import editIcon from '../../images/Edit-Button.svg';
import likeIcon from '../../images/like.svg';
import likeActiveIcon from '../../images/like-active.svg';

export const images = [
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
