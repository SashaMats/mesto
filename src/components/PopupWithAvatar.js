import Popup from "./Popup.js";

export default
class PopupWithAvatar extends Popup {
  constructor(popupSelector, submitColback) {
    super(popupSelector);
    this._submitColback = submitColback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._button = this._form.querySelector('.popup__button-save');
    this._buttonText = this._button.textContent;

  }

  _getInputValues() {
    this._userData = {};
    this._inputList.forEach(input => {
    this._userData[input.name] = input.value;
    });
    return this._userData;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitColback(this._getInputValues());
    })
  }

  buttonTextLoad() {
    this._button.textContent = `${this._button.textContent}...`
  }

  buttonTextDefault() {
    this._button.textContent = `${this._buttonText}`
  }

  close() {
    super.close();
    this._form.reset();
  }
}