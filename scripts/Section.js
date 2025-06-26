//Section.js
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items || [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._userId = null;
  }

  renderItems(userId) {
    this._userId = userId;
    this._items.forEach((item) => this._renderer(item, this._userId));
  }

  addItem(element, prepend = true) {
    if (prepend) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  setItems(items) {
    this._items = items || [];
  }

  clear() {
    this._container.innerHTML = '';
  }
}