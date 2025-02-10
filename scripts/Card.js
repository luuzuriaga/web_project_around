export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".post")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector(".heart-icon").addEventListener("click", () => {
      this._toggleLike();
    });
    this._element.querySelector(".trash-icon").addEventListener("click", () => {
      this._deleteCard();
    });
    this._element
      .querySelector(".post__picture")
      .addEventListener("click", () => {
        this._openImageModal();
      });
  }

  _toggleLike() {
    const likeIcon = this._element.querySelector(".heart-icon");
    likeIcon.classList.toggle("liked");
  }

  _deleteCard() {
    this._element.remove();
  }

  _openImageModal() {
    openModalWithImage(this._name, this._link);
  }

  getCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".post__info-bar-name").textContent =
      this._name;
    const img = this._element.querySelector(".post__picture");
    img.src = this._link;
    img.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
