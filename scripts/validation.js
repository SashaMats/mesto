const settings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_status-disactive',
  inputErrorClass: 'popup__input_evt-error',
  errorClass: 'popup__input-error_active'
});
enableValidation(settings);

function hideButton(button, {inactiveButtonClass}) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
};

function  showButton(button, {inactiveButtonClass}) {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

function showInputError(formElement, inputElement, errorMessages, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessages;
  errorElement.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};

function isButtonValid(inputList) { 
  return inputList.some(item => !item.validity.valid); 
};

function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
};

function setEventListeners(formElement, inputElement, {submitButtonSelector}) { 
  const button = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputElement)); 
  inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', () => { 
      isValid(formElement, inputElement); 
      if (isButtonValid(inputList)){hideButton(button, settings);} 
      else {showButton(button, settings);} 
    }); 
  }); 
};

function enableValidation({formSelector, inputSelector}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((item) => {
    setEventListeners(item, inputSelector, settings);
  });
};