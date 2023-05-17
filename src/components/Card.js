export default
class Card {
  constructor(data, templateSelector, openPopupImage) {
    this._data = data;
    this._name = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupImage = openPopupImage;
  }
  _getTemplate() {
    const element = document
    .getElementById(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return element;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._wasteBasketButton = this._element.querySelector('.element__wastebasket');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardDescription = this._element.querySelector('.element__description');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardDescription.textContent = this._name;
    this._setEventListeners();
    return this._element;
  } 

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._likeToggle());
    this._wasteBasketButton.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this._imageOpen());
  }
  _likeToggle() {
    this._likeButton.classList.toggle('element__like_active');
  }
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _imageOpen = () => {
    this._openPopupImage(this._data);
  }
}