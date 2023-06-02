import Popup from "./Popup.js";

export default
class popupDeleteCard extends Popup {
  constructor(popupSelector, submitColback) {
    super(popupSelector);
    this._submitColback = submitColback;
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._form.querySelector('.popup__button-save');
    this._buttonText = this._button.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitColback({thisCard: this._card, thisId: this._dataId});
    }) 
  }
  open = ({thisCard, thisId}) => {
    super.open();
    this._card = thisCard;
    this._dataId = thisId;
  }

  close() {
    super.close();
  }

  buttonTextLoad() {
    this._button.textContent = `${this._button.textContent}...`
  }

  buttonTextDefault() {
    this._button.textContent = `${this._buttonText}`
  }
}