import Popup from "./Popup.js";

export default
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgUrl = this._popup.querySelector('.popup__image');
    this._popupImgTitle = this._popup.querySelector('.popup__title');
  }

  open = (data) => {
    this._popupImgUrl.src = data.link;
    this._popupImgTitle.textContent = data.name;
    this._popupImgUrl.alt = data.name;
    super.open();
  }
}