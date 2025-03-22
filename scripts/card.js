export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    return cardTemplate.cloneNode(true);
  }
  _handleDeleteCard(event) {
    event.target.closest(".post").remove();
  }
  _handleLikeButton(event) {
    const likeButton = event.target;
    likeButton.alt = likeButton.alt === "Not liked" ? "Liked" : "Not liked";
    likeButton.src =
      likeButton.alt === "Liked"
        ? "./images/heart-icon-black.svg"
        : "./images/heart-icon.svg";
  }
  _setEventListeners(cardElement) {
    cardElement.querySelector(".trash-button")
      .addEventListener("click", (event) => this._handleDeleteCard(event));
    cardElement.querySelector(".heart-icon")
      .addEventListener("click", (event) => this._handleLikeButton(event));
    cardElement.querySelector(".post__picture")
      .addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }
  createCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".post__picture");
    const cardTitle = cardElement.querySelector(".post__info-bar-name");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners(cardElement);
    return cardElement;
  }
}
