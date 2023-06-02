import './index.css';                                          //включить при webpack
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_status-disactive',
  inputErrorClass: 'popup__input_evt-error',
  errorClass: 'popup__input-error_active'
};

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'c8278fb8-59b1-406f-bd93-93c438e0e690',
    'Content-Type': 'application/json'
  }
});

const editButton = document.querySelector('.profile__pencil-button');    //кнопка
const addProfileButton = document.querySelector('.profile__add-button'); //кнопка
const avatarButton = document.querySelector('.profile__avatar-button');   // кнопка
const deleteButton = document.querySelector('.element__wastebasket');     // кнопка корзина

const popupProfile = document.querySelector('.popup_profile');            // профайл попап
const popupAddPlace = document.querySelector('.popup_add-place');         // попап место
const popupImage = document.querySelector('.popup_img');                  // попап картинка
const popupAvatar = document.querySelector('.popup_avatar');              // попап аватар
const popupDelCard = document.querySelector('.popup_delete');            // попап удаления карточки

const elementsList = document.querySelector('.elements__list');           // контейнер карточек

const userDataFromPage = {
  userName: document.querySelector('.profile__title'),
  userJob: document.querySelector('.profile__subtitle'),
  userAvatar: document.querySelector('.profile__avatar')
}

const profileFormElement = document.forms.profileInfoForm;
const placeFormElement = document.forms.placeForm;
const avatarFormElement = document.forms.profileAvatarForm;

//Класс Юзер Дата
const userData = new UserInfo(userDataFromPage);

//Класс Попап-удаления карточки 
const popupWithDeleteForm = new PopupDeleteCard(popupDelCard, 
  ({thisCard, thisId}) => {
    new Promise((resolve) => {
      resolve(api.deleteCard(thisId), popupWithDeleteForm.buttonTextLoad())
    })
    .then(resolve => {
      thisCard.deleteCard()
    })
    .finally(() => popupWithDeleteForm.close(popupWithDeleteForm.buttonTextDefault()))
  }
);
popupWithDeleteForm.setEventListeners();

// //Класс Секция
const defaultCardElement = new Section({
  renderer: (item) => {
    const card = new Card(item, 'element', 
    popupWithImageForm.open, 
    api.setLike, 
    api.deleteCard, 
    api.deleteLike, 
    popupWithDeleteForm.open);
    const cardElement = card.generateCard();
    defaultCardElement.setItem(cardElement);
    }
  },
  elementsList
);

//Функция создания карточки с препендом
function createCard(item) {
  const card = new Card(item, 'element', 
  popupWithImageForm.open, 
  api.setLike, 
  api.deleteCard, 
  api.deleteLike, 
  popupWithDeleteForm.open);
  const cardElement = card.generateCard();
  defaultCardElement.setItemPrepend(cardElement);
};

//Класс Попап-создание карточки
const popupWithAddPlaceForm = new PopupWithForm(
  popupAddPlace, 
  (data) => {
    Promise.all([api.getAuthorInfo(), api.setCardOnServ(data), popupWithAddPlaceForm.buttonTextLoad()])
      .then(([dataUserInfo, dataCard]) => {
        dataCard._authorId = dataUserInfo._id;
        createCard(dataCard);
      })
      .finally(() => popupWithAddPlaceForm.close(popupWithAddPlaceForm.buttonTextDefault()))
    },
);
popupWithAddPlaceForm.setEventListeners();


//Класс Попап-аватар
const popapAvatarForm = new PopupWithAvatar(popupAvatar, 
  (data) => {
    new Promise((res) => {
      res(api.setAuthorAvatar(data), popapAvatarForm.buttonTextLoad())
    })
    .then(res => userData.setUserAvatar({link: res.avatar}))
    .finally(() => {popapAvatarForm.buttonTextDefault(), popapAvatarForm.close()})
  }
);
popapAvatarForm.setEventListeners();

//Класс Попап-картинка
const popupWithImageForm = new PopupWithImage(popupImage);
popupWithImageForm.setEventListeners();

//Класс Попап - данные пользователя
const popupWithProfileForm = new PopupWithForm(popupProfile, 
  (data) => {
  new Promise((res) => {
    res(api.setAuthorInfo(data), popupWithProfileForm.buttonTextLoad())
  })
  .then(res => userData.setUserInfo({name: res.name, description: res.about}))
  .finally(() => popupWithProfileForm.close(popupWithProfileForm.buttonTextDefault()))
});
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

//Открытие попап редактор аватара
avatarButton.addEventListener('click', () => {
  popapAvatarForm.open();
})

//Валидаторы
const validationPlaceForm = new FormValidator(settings, placeFormElement);
validationPlaceForm.enableValidation();

const validationProfileForm = new FormValidator(settings, profileFormElement);
validationProfileForm.enableValidation();

const validationAvatarForm = new FormValidator(settings, avatarFormElement);
validationAvatarForm.enableValidation();

Promise.all([api.getAuthorInfo(), api.getInitialCards()])
  .then(([dataUserInfo, dataCard]) => {
    // Card gen
    dataCard.forEach(element => {
      element._authorId = dataUserInfo._id
    });
    defaultCardElement.renderItems(dataCard);
    // User info
    const userDataServ = new UserInfo(userDataFromPage);
    userDataServ.setUserInfo({ name: dataUserInfo.name, description: dataUserInfo.about});
    userDataServ.setUserAvatar({link: dataUserInfo.avatar});
  })
