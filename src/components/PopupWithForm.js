import Popup from "./Popup.js";

export default
class PopupWithForm extends Popup {
  constructor(popupSelector, submitColback) {
    super(popupSelector);
    this._submitColback = submitColback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
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
      this._submitColback(this._getInputValues(), this.close());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}