import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profilePopup = document.getElementById('ProfilePopup');
const placePopup = document.getElementById('PlacePopup');
const editButton = document.querySelector('.profile__pencil-button');
const addProfileButton = document.querySelector('.profile__add-button');
const closeProfilePopupButton = document.getElementById('CloseProfilePopup');
const closePlacePopupButton = document.getElementById('ClosePlacePopup');
const closeImagePopup = document.getElementById('CloseImgPopup');


const profileFormElement = document.getElementById('ProfileForm');
const nameInput = profileFormElement.querySelector('.popup__input_text_name');
const jobInput = profileFormElement.querySelector('.popup__input_text_description');


const placeFormElement = document.forms.placeForm;
const titleInput = placeFormElement.querySelector('.popup__input_place_name');
const urlInput = placeFormElement.querySelector('.popup__input_place_url');
const placeFormSaveButton = placeFormElement.querySelector('.popup__button-save');

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');


const elements = document.querySelector('#element').content;
const elementsList = document.querySelector('.elements__list');

const popupImg = document.querySelector('.popup_img');
const popupCloseButton = document.querySelector('.popup__button-close');

const popupImgUrl = imgPopup.querySelector('.popup__image');
const popupImgTitle = imgPopup.querySelector('.popup__title');


const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_status-disactive',
  inputErrorClass: 'popup__input_evt-error',
  errorClass: 'popup__input-error_active'
};
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Функция открытие/закрытие popup
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function editPopup(popup) {
  document.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function editPopupPlace(placePopup) {
  editPopup(placePopup);
  titleInput.value = '';
  urlInput.value = '';
  validationPlaceForm.resetButtonOpenPopup();
};

function checkClick(evt, popup) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
  };
};

closePlacePopupButton.addEventListener('click', 
() =>  closePopup(placePopup));
closeProfilePopupButton.addEventListener('click', 
() =>  closePopup(profilePopup));
closeImagePopup.addEventListener('click', 
() =>  closePopup(popupImg));

profilePopup.addEventListener('mousedown', (evt) => checkClick(evt, profilePopup));
placePopup.addEventListener('mousedown', (evt) => checkClick(evt, placePopup));
popupImg.addEventListener('mousedown', (evt) => checkClick(evt, popupImg));

function openPopupImage(data){
    popupImgUrl.src = data.link;
    popupImgTitle.textContent = data.name;
    popupImgUrl.alt = data.name;
    editPopup(popupImg);
};

function createCard(item) {
  const card = new Card(item, 'element', openPopupImage);
  const cardElement = card.generateCard();
  return cardElement;
};

//------Заполнение полей формы----------------
function profileFormInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  editPopup(profilePopup);
  validationProfileForm.resetButtonOpenPopup();
}
editButton.addEventListener('click', profileFormInputs);
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Обработчик формы
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function profileInfoForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue =  nameInput.value
  const jobValue = jobInput.value
  // Выберите элементы, куда должны быть вставлены значения полей
  profileTitle.textContent = nameValue;
  profileSubtitle.textContent = jobValue; 
  
  // Вставьте новые значения с помощью textContent
  closePopup(profilePopup);
}
profileFormElement.addEventListener('submit', profileInfoForm);

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//Функция добавления новой карточки + форма
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function placeInfoForm (evt) {
  evt.preventDefault();
  const placeData = {}
  placeData.name = titleInput.value;
  placeData.link = urlInput.value;
    elementsList.prepend(createCard(placeData));
  closePopup(placePopup);
};
placeFormElement.addEventListener('submit', placeInfoForm);
addProfileButton.addEventListener('click', () => editPopupPlace(placePopup));

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//Создание карточек из массива
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

initialCards.forEach((item) => {
  elementsList.append(createCard(item));
});   

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//Валидация форм
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
const validationPlaceForm = new FormValidator(settings, placeFormElement);
validationPlaceForm.enableValidation();

const validationProfileForm = new FormValidator(settings, profileFormElement);
validationProfileForm.enableValidation();