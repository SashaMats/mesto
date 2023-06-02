export default
class Section {
  constructor ({ renderer }, selector) {
    this.renderer = renderer;
    this._container = selector;
  }

  renderItems(cards) {
    cards.forEach((item) => {this.renderer(item)});
  }

  setItem(element) {
    this._container.append(element);
  }

  setItemPrepend(element) {
    this._container.prepend(element);
  }
}