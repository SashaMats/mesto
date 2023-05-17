import './index.css';
import initialCards from '../utils/cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
  renderer: (item) => {
      const card = new Card(item, 'element', popupWithImageForm.open);
      const cardElement = card.generateCard();
      defaultCardElement.setItem(cardElement);
      }
    },
  elementsList
);
defaultCardElement.renderItems(initialCards);

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
  // console.log(userData);
  const first = userData.getUserInfo();
  // console.log(first);
  // console.log(popupWithProfileForm);
  const sec = popupWithProfileForm.setInputValues(first);
  console.log(sec);
  // popupWithProfileForm.setInputValues(userData.getUserInfo());
});

//Валидаторы
const validationPlaceForm = new FormValidator(settings, placeFormElement);
validationPlaceForm.enableValidation();

const validationProfileForm = new FormValidator(settings, profileFormElement);
validationProfileForm.enableValidation();