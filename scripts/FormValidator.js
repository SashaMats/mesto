export default
class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  enableValidation() {
    this._setEventListeners();
  };
  _setEventListeners() {
    const button = this._form.querySelector(this._submitButtonSelector);
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => { 
        this._isValid(inputElement); 
        this._isVisibleButton(inputList, button);
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
  _showButton(button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  };
  _hideButton(button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  };
  _isVisibleButton(inputList, button) {
    if (inputList.some((input) => !input.validity.valid)) {
      this._hideButton(button, this._inactiveButtonClass);
    } else {
      this._showButton(button, this._inactiveButtonClass);
    };
  };
};
