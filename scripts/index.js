
let profilePopup = document.getElementById('ProfilePopup');
let placePopup = document.getElementById('PlacePopup');
let editButton = document.querySelector('.profile__pencil-button');
let addProfileButton = document.querySelector('.profile__add-button');
let closeProfilePopupButton = document.getElementById('CloseProfilePopup');
let closePlacePopupButton = document.getElementById('ClosePlacePopup');


let profileFormElement = document.getElementById('ProfileForm');
let nameInput = profileFormElement.querySelector('.popup__input_text_name');
let jobInput = profileFormElement.querySelector('.popup__input_text_description');


let placeFormElement = document.getElementById('PlaceForm');
let titleInput = placeFormElement.querySelector('.popup__input_place_name');
let urlInput = placeFormElement.querySelector('.popup__input_place_url');

let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');


const elements = document.querySelector('#element').content;
let elementsList = document.querySelector('.elements__list');

const popupImg = document.querySelector('.popup-img');
const popupImgUrl = document.querySelector('.popup-img__image');
const popupImgTitle = document.querySelector('.popup-img__title');
const imgClose = document.querySelector('.popup-img__button-close');




const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Обработчик клика по кнопке pencil-button
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function editProfilePopup() {
  profilePopup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
editButton.addEventListener('click', editProfilePopup);

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Обработчик клика по кнопке Place add-button
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

function editPlacePopup() {
  placePopup.classList.add('popup_opened');
  titleInput.value = 'Название';
  urlInput.value = 'Ссылка на картинку';
}
addProfileButton.addEventListener('click', editPlacePopup);

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Обработчик клика по  кнопке Profile button-close
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}
closeProfilePopupButton.addEventListener('click', closeProfilePopup);

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Обработчик клика по  кнопке Place button-close
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

function closePlacePopup() {
  placePopup.classList.remove('popup_opened');
}
closePlacePopupButton.addEventListener('click', closePlacePopup);

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Функция создания карточки
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

function createCard(name, link){
  const element = elements.querySelector('.element').cloneNode(true);
  element.querySelector('.element__description').textContent = name;
  element.querySelector('.element__image').src = link;
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
  function viewImage() {
    const popupImgUrl = document.querySelector('.popup-img__image');
    const popupImgTitle = document.querySelector('.popup-img__title');
  
    const card = imgButton.closest('.element');
    popupImgUrl.src = card.querySelector('.element__image').src;
    popupImgTitle.textContent = card.querySelector('.element__description').textContent;
    popupImg.classList.add('popup-img_opened');
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
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let nameValue =  nameInput.value
  let jobValue = jobInput.value
    // Выберите элементы, куда должны быть вставлены значения полей
    profileTitle.textContent = nameValue;
    profileSubtitle.textContent = jobValue;
    // Вставьте новые значения с помощью textContent
    closeProfilePopup()
}
profileFormElement.addEventListener('submit', handleFormSubmit);

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//Функция добавления новой карточки + форма
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function handleFormPlaceSubmit (evt) {
  evt.preventDefault();
  let titleValue = titleInput.value;
  let urlValue = urlInput.value;
  /*const element = elements.querySelector('.element').cloneNode(true);
  element.querySelector('.element__description').textContent = titleValue;
  element.querySelector('.element__image').src = urlValue;
  elementsList.prepend(element);
  */
  const addedCard = createCard(titleValue, urlValue);
  elementsList.prepend(addedCard);

  closePlacePopup();
}
placeFormElement.addEventListener('submit', handleFormPlaceSubmit);

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//Функция добавления карточек из массива
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function addElements(){
  const placeName = initialCards.map(function(place){
    return place.name;
  });
  const placeLink = initialCards.map(function(link){
    return link.link;
  });
    for (let i = 0; i < placeName.length; i++) {
      const listCard = createCard(placeName[i], placeLink[i]);
      elementsList.append(listCard);
    };
  };
  addElements();
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//Функция лайк
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------


/*
liks.forEach(function(item){
item.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
});
});
*/


//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//Функция закрытие попап картинки
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

function closeFullImage() {
  popupImg.classList.remove('popup-img_opened');
}
imgClose.addEventListener('click', closeFullImage);
