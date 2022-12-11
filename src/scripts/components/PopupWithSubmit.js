import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleSubmit, renderLoading) {
      super(popupSelector),
      this.handleSubmit = handleSubmit;
      this.renderLoading = renderLoading;
      this.submitButton = this.popup.querySelector('.save-button');
    }
    
    open(id, card) {
        super.open();
    
      this._cardId = id;
      this._card = card;

    }
  
    setEventListeners() {
      super.setEventListeners();
       //обработчик сабмита формы.
       this.submitButton.addEventListener('click', (evt) => {
        evt.preventDefault(); 
        this.handleSubmit(this._cardId, this._card)
      })
    }

    changeSubmitHandler(newHandler) {
      this.handleSubmit = newHandler;
    }
  }