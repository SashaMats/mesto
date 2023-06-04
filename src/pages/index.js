import './index.css';                                          //включить при webpack
import {
  settings,
  apiData,
  editButton,
  addProfileButton,
  avatarButton,
  popupProfile,
  popupAddPlace,
  popupImage,
  popupAvatar,
  popupDelCard,
  elementsList,
  userDataFromPage,
  profileFormElement,
  placeFormElement,
  avatarFormElement
} from '../utils/constants.js'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//Класс Api
const api = new Api(apiData);

//Класс Юзер Дата
const userData = new UserInfo(userDataFromPage);

//Класс Попап-удаления карточки 
const popupWithDeleteForm = new PopupDeleteCard(popupDelCard, 
  ({thisCard, thisId}) => {
    popupWithDeleteForm.setLoadTextForButton();
    api
      .deleteCard(thisId)
      .then(() => {
        thisCard.deleteCard();
        popupWithDeleteForm.close();
      })
      .finally(() => {
        popupWithDeleteForm.setDefaultTextForButton();
      })
  }
);
popupWithDeleteForm.setEventListeners();

// Функция рендер карточки
function getCard(item) {
  const card = new Card(item, 'element', 
  popupWithImageForm.open, 
  api.setLike, 
  api.deleteCard, 
  api.deleteLike, 
  popupWithDeleteForm.open);
  const cardElement = card.generateCard();
  return cardElement;
}

//Функция создания карточки
function createCard(item) {
  const cardElement = getCard(item);
  defaultCardElement.setItemPrepend(cardElement);
};

// //Класс Секция
const defaultCardElement = new Section({
  renderer: (item) => {
    const cardElement = getCard(item);
    defaultCardElement.setItem(cardElement);
  }
},
  elementsList
);

//Класс Попап-создание карточки
const popupWithAddPlaceForm = new PopupWithForm(
  popupAddPlace, 
  (data) => {
    Promise.all([api.setCardOnServ(data), popupWithAddPlaceForm.setLoadTextForButton()])
    .then(([dataCard]) => {
      dataCard._authorId = userData._userId;
      createCard(dataCard);
      popupWithAddPlaceForm.close();
    })
      .finally(() => popupWithAddPlaceForm.setDefaultTextForButton())
      .catch((error => console.error('Ошибка при создании карточки' `${error}`)))
    },
);
popupWithAddPlaceForm.setEventListeners();


//Класс Попап-аватар
const popapAvatarForm = new PopupWithForm(popupAvatar, 
  (data) => {
    popapAvatarForm.setLoadTextForButton();
    api
      .setAuthorAvatar(data)
      .then(res => {
        userData.setUserAvatar({link: res.avatar});
        popapAvatarForm.close();
      })
    .finally(() => {popapAvatarForm.setDefaultTextForButton()})
    .catch((error => console.error('Ошибка при изменении аватара' `${error}`)))
  }
);

popapAvatarForm.setEventListeners();

//Класс Попап-картинка
const popupWithImageForm = new PopupWithImage(popupImage);
popupWithImageForm.setEventListeners();

//Класс Попап - данные пользователя

const popupWithProfileForm = new PopupWithForm(popupProfile, 
  (data) => {
    popupWithProfileForm.setLoadTextForButton();
    api
      .setAuthorInfo(data)
      .then(res => {
        userData.setUserInfo({name: res.name, description: res.about});
        popupWithProfileForm.close()
      })
      .finally(() => popupWithProfileForm.setDefaultTextForButton())
      .catch((error => console.error('Ошибка при редактировании данных пользователя' `${error}`)))
  }
);

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
  validationAvatarForm.resetButtonOpenPopup();
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
    userData.setUserInfo({ name: dataUserInfo.name, description: dataUserInfo.about});
    userData.setUserAvatar({link: dataUserInfo.avatar});
    userData._userId = dataUserInfo._id;
  })
  .catch((error => console.error('Ошибка при получении данных с сервера о пользователе и карточках' `${error}`)))