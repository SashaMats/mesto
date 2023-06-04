
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_status-disactive',
  inputErrorClass: 'popup__input_evt-error',
  errorClass: 'popup__input-error_active'
};

export const apiData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'c8278fb8-59b1-406f-bd93-93c438e0e690',
    'Content-Type': 'application/json'
  }
};

export const editButton = document.querySelector('.profile__pencil-button');    //кнопка
export const addProfileButton = document.querySelector('.profile__add-button'); //кнопка
export const avatarButton = document.querySelector('.profile__avatar-button');   // кнопка

export const popupProfile = document.querySelector('.popup_profile');            // профайл попап
export const popupAddPlace = document.querySelector('.popup_add-place');         // попап место
export const popupImage = document.querySelector('.popup_img');                  // попап картинка
export const popupAvatar = document.querySelector('.popup_avatar');              // попап аватар
export const popupDelCard = document.querySelector('.popup_delete');            // попап удаления карточки

export const elementsList = document.querySelector('.elements__list');           // контейнер карточек

export const userDataFromPage = {
  userName: document.querySelector('.profile__title'),
  userJob: document.querySelector('.profile__subtitle'),
  userAvatar: document.querySelector('.profile__avatar')
}

export const profileFormElement = document.forms.profileInfoForm;
export const placeFormElement = document.forms.placeForm;
export const avatarFormElement = document.forms.profileAvatarForm;