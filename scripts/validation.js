const objects = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_status-disactive',
  inputErrorClass: 'popup__input_evt-error',
  errorClass: 'popup__input-error_active'
});



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

function isButtonValid(button, inputList) {
  console.log(button);
  console.log(inputList.some(item => !item.validity.valid) || inputList.some(input => input.value.length === 0));
  return inputList.some(item => !item.validity.valid) || inputList.some(input => input.value.length === 0);
};

function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, objects);
    } else {
      hideInputError(formElement, inputElement, objects);
    }
};

function setEventListeners(formElement, inputElement) {
  const button = formElement.querySelector(objects.submitButtonSelector);
  hideButton(button, objects);
  const inputList = Array.from(formElement.querySelectorAll(inputElement));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      if (isButtonValid(button, inputList)) {hideButton(button, objects)}
      else {showButton(button, objects)}
    });
  });
};

function enableValidation({formSelector, inputSelector}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((item) => {
    setEventListeners(item, inputSelector);
  });
};


enableValidation(objects);