
const profilePopup = document.getElementById('ProfilePopup');
const placePopup = document.getElementById('PlacePopup');
const editButton = document.querySelector('.profile__pencil-button');
const addProfileButton = document.querySelector('.profile__add-button');
const closeProfilePopupButton = document.getElementById('CloseProfilePopup');
const closePlacePopupButton = document.getElementById('ClosePlacePopup');


const profileFormElement = document.getElementById('ProfileForm');
const nameInput = profileFormElement.querySelector('.popup__input_text_name');
const jobInput = profileFormElement.querySelector('.popup__input_text_description');


const placeFormElement = document.getElementById('PlaceForm');
const titleInput = placeFormElement.querySelector('.popup__input_place_name');
const urlInput = placeFormElement.querySelector('.popup__input_place_url');

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');


const elements = document.querySelector('#element').content;
const elementsList = document.querySelector('.elements__list');

const popupImg = document.querySelector('.popup_img');
const popupCloseButton = document.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Функция открытие/закрытие popup
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function editPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__button-close').addEventListener('click', 
  () =>  closePopup(popup));
};

editButton.addEventListener('click', () => editPopup(profilePopup));
addProfileButton.addEventListener('click', () => editPopup(placePopup));

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Функция создания карточки
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

function createCard(name, link){
  const element = elements.querySelector('.element').cloneNode(true);
  element.querySelector('.element__description').textContent = name;
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = name;

  //--- Функция Лайк----//
  const likes = element.querySelector('.element__like');
  likes.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //--- Функция Корзина----//
  const wasteBasket = element.querySelector('.element__wastebasket');
  wasteBasket.addEventListener('click', function(){
  const listItem = wasteBasket.closest('.element');
  listItem.remove();
  });
  //--- Функция Картинка Попап----//
  const popupImgUrl = imgPopup.querySelector('.popup__image');
  const popupImgTitle = imgPopup.querySelector('.popup__title');
  function viewImage() {
    popupImgUrl.src = link;
    popupImgTitle.textContent = name;
    popupImg.classList.add('popup_opened');
    popupImg.querySelector('.popup__button-close').addEventListener('click', 
    () => closePopup(popupImg));
  }
  const imgButton = element.querySelector('.element__image');
  imgButton.addEventListener('click', viewImage);
  return element;
};

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
  const titleValue = titleInput.value;
  const urlValue = urlInput.value;
  const addedCard = createCard(titleValue, urlValue);
  elementsList.prepend(addedCard);

  closePopup(placePopup);
}
placeFormElement.addEventListener('submit', placeInfoForm);

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//Функция добавления карточек из массива
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
initialCards.forEach(function(item){
  elementsList.append(createCard(item.name, item.link));
});