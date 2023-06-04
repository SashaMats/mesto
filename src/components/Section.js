export default
class Section {
  constructor ({ renderer }, container) {
    this.renderer = renderer;
    this._container = container;
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