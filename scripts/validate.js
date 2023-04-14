let objects = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_status-disactive',
  inputErrorClass: 'popup__input_evt-error',
  errorClass: 'popup__input-error_active'
});
enableValidation(objects);

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
  const formElement = document.querySelector(formSelector);
  const inputElement = formElement.querySelector(inputSelector);

  function showInputError(formElement, inputElement, errorMessages) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessages;
    errorElement.classList.add(errorClass);
  };
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
  };
  function nullInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    errorElement.classList.add(errorClass);
    errorElement.textContent = 'Вы пропустили поле';
  };
  function hideButton(formElement) {
    const button = formElement.querySelector(submitButtonSelector);
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  };
  function  showButton(formElement) {
    const button = formElement.querySelector(submitButtonSelector);
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  };
  function isValid(formElement, inputElement) {
    if  (inputElement.value.length === 0) {
      nullInputError(formElement, inputElement)} else {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
    }
  };
  function isButtonValid(inputList) {
    return inputList.some(item => !item.validity.valid) || inputList.some(input => input.value.length === 0);
  };
  function setEventListeners(formElement) {
    hideButton(formElement);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        if (isButtonValid(inputList)) {hideButton(formElement)}
        else {showButton(formElement)}
      });
    });
  };
  function formValidation() {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((item) => {
      setEventListeners(item);
    });
  };
  formValidation();
};