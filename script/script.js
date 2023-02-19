// Обработчик клика по кнопке pencil-button
let editButton = document.querySelector('.profile__pencil-button');

function editPopup() {
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', editPopup);

// Обработчик клика по  кнопке button-close
let closeButton = document.querySelector('.popup__button-close');

function closePopup() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

// Обработчик формы
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let profile = document.querySelector('.profile');
  let profileTitle = profile.querySelector('.profile__title');
  let profileSubtitle = profile.querySelector('.profile__subtitle');
    // Выберите элементы, куда должны быть вставлены значения полей
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);