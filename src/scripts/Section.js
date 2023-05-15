export default
class Section {
  constructor ({ data, renderer }, selector) {
    this._renderItems = data;
    this.renderer = renderer;
    this._container = selector;
  }

  renderItems() {
    this._renderItems.forEach((item) => {this.renderer(item)});
  }

  setItem(element) {
    this._container.prepend(element);
  }
}