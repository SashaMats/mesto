import '../pages/index.css';
import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

;
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_status-disactive',
  inputErrorClass: 'popup__input_evt-error',
  errorClass: 'popup__input-error_active'
};

const editButton = document.querySelector('.profile__pencil-button');    //кнопка
const addProfileButton = document.querySelector('.profile__add-button'); //кнопка

const popupProfile = document.querySelector('.popup_profile');            // профайл попап
const popupAddPlace = document.querySelector('.popup_add-place');         // попап место
const popupImage = document.querySelector('.popup_img');                  // попап картинка

const elementsList = document.querySelector('.elements__list');           // контейнер карточек

const userDataFromPage = {
  userName: document.querySelector('.profile__title'),
  userJob: document.querySelector('.profile__subtitle')
}

const profileFormElement = document.forms.profileInfoForm;
const placeFormElement = document.forms.placeForm

//Класс Юзер Дата
const userData = new UserInfo(userDataFromPage);

//Класс Попап-картинка
const popupWithImageForm = new PopupWithImage(popupImage);
popupWithImageForm.setEventListeners();

//Класс Секция
const defaultCardElement = new Section({
  data: initialCards,
  renderer: (item) => {
      const card = new Card(item, 'element', popupWithImageForm.open);
      const cardElement = card.generateCard();
      defaultCardElement.setItem(cardElement);
      }
    },
  elementsList
);
defaultCardElement.renderItems();

//Класс Попка-создание карточки
const popupWithAddPlaceForm = new PopupWithForm(popupAddPlace, defaultCardElement.renderer);
popupWithAddPlaceForm.setEventListeners();

//Класс Попап - данные пользователя
const popupWithProfileForm = new PopupWithForm(popupProfile, userData.setUserInfo);
popupWithProfileForm.setEventListeners();

//Открытие попап создание карточки
addProfileButton.addEventListener('click', () => {
  popupWithAddPlaceForm.open();
  validationPlaceForm.resetButtonOpenPopup();
});

//Открытие попап редактор профиля
editButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  popupWithProfileForm.setInputValues(userData.getUserInfo());
});

//Валидаторы
const validationPlaceForm = new FormValidator(settings, placeFormElement);
validationPlaceForm.enableValidation();

const validationProfileForm = new FormValidator(settings, profileFormElement);
validationProfileForm.enableValidation();