export default
class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  enableValidation() {
    this._setEventListeners();
  };
  resetButtonOpenPopup() {
    this._isVisibleButton();
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
  };
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => { 
        this._isValid(inputElement); 
        this._isVisibleButton();
      });
    });
  };
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
    this._showInputError(inputElement, this._inputErrorClass);
    } else {
    this._hideInputError(inputElement, this._inputErrorClass);
    };
  };
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  };
  _showButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled');
  };
  _hideButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  };
  _isVisibleButton() {
    if (this._inputList.some((input) => !input.validity.valid)) {
      this._hideButton();
    } else {
      this._showButton();
    };
  };
};
