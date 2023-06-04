export default
class Card {
  constructor(data, templateSelector, openPopupImage, likeFunktion, deleteFunction, deleteLikeFunction, deletePopup) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likeFunction = likeFunktion;
    this._deleteLikeOnServ = deleteLikeFunction;
    this._deleteCardFunction = deleteFunction;
    this._templateSelector = templateSelector;
    this._openPopupImage = openPopupImage;
    this._ownerId = data.owner._id;
    this._authorId = data._authorId;
    this._deletePopUpOpenFunc = deletePopup;
  }
  _getTemplate() {
    const element = document
    .getElementById(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return element;
  }

  _hideWastBascket() {
    if (this._authorId !== this._ownerId) {
      this._wasteBasketButton.classList.add('element__wastbasket_hide');
    }
  }

  _showLike() {
    this._likes.forEach(item => {
      if (item._id === this._authorId) {
        this._likeButton.classList.add('element__like_active');
      };
    })
  }

  _countLikes(data) {
    this._cardLikes.textContent = data;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._wasteBasketButton = this._element.querySelector('.element__wastebasket');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardDescription = this._element.querySelector('.element__description');
    this._cardLikes = this._element.querySelector('.element__likes-count')
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardDescription.textContent = this._name;
    this._cardLikes.textContent = this._likes.length;
    this._hideWastBascket();
    this._setEventListeners();
    this._showLike();
    return this._element;
  } 

  getCardId() {
    console.log(this.data._id);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._likeToggle());
    this._wasteBasketButton.addEventListener('click', () => this._openDeletePopup());
    this._cardImage.addEventListener('click', () => this._imageOpen());
  }
  
  _likeToggle() {
    const dataId = this._data._id;
    if (this._likeButton.classList.contains('element__like_active')) {
      this._deleteLikeOnServ(dataId)
        .then(res => {
        this._countLikes(res.likes.length);
        this._likeButton.classList.remove('element__like_active');
        })
        .catch((error) => console.error(`Ошибка в функции лайк ${error}`))
    } else {
      this._likeFunction(dataId)
        .then(res => {
        this._countLikes(res.likes.length);
        this._likeButton.classList.add('element__like_active');
        })
        .catch((error) => console.error(`Ошибка в функции лайк ${error}`))
      }
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _openDeletePopup() {
    this._deletePopUpOpenFunc({thisCard: this, thisId: this._data._id});
  }

  _imageOpen = () => {
    this._openPopupImage(this._data);
  }
}