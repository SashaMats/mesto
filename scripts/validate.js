enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_status-disactive',
  inputErrorClass: 'popup__input_evt-error',
  errorClass: 'popup__input-error_active'
});

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings.inputSelector, settings);
  });
};

function setEventListeners(formElement, inputElement, settings) {
  const button = formElement.querySelector(settings.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputElement));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => { 
      isValid(inputElement, formElement, settings); 
      isVisibleButton(inputList, button, settings);
    });
  });
};

function isValid(inputElement, formElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, formElement, settings.inputErrorClass, settings.errorClass, inputElement.validationMessage);
  } else {
    hideInputError(inputElement, formElement, settings.inputErrorClass, settings.errorClass);
  };
};

function isVisibleButton(inputList, button, settings) {
  if (inputList.some((input) => !input.validity.valid)) {
    hideButton(button, settings.inactiveButtonClass);
  } else {
    showButton(button, settings.inactiveButtonClass);
  };
};

function  showButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

function hideButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
};

function showInputError(inputElement, formElement,  inputErrorClass, errorClass, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

function hideInputError(inputElement, formElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};