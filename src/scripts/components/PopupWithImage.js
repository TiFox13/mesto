import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
      super(popupSelector);
      this._image = this.popup.querySelector('.popup-image__image');
      this._text = this.popup.querySelector('.popup-image__place-info');
    }
  
    open(link, name) { 
      this._image.src = link;
      this._image.alt = name;
      this._text.textContent = name;
      super.open();
    }
}


