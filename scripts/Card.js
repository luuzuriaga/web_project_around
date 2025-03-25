export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // Clonamos el template del DOM
    const cardTemplate = document.querySelector(this._templateSelector).content;
    return cardTemplate.cloneNode(true);
  }

  _handleDeleteCard(event) {
    // Elimina la tarjeta del DOM cuando se hace clic en el botón de borrar
    event.target.closest(".post").remove();
  }

  _handleLikeButton(event) {
    const likeButton = event.target;
    // Cambia el estado de "like"
    likeButton.alt = likeButton.alt === "Not liked" ? "Liked" : "Not liked";
    likeButton.src =
      likeButton.alt === "Liked"
        ? "./images/heart-icon-black.svg"  // Imagen cuando está "liked"
        : "./images/heart-icon.svg";  // Imagen cuando no está "liked"
  }

  _setEventListeners(cardElement) {
    // Asocia los eventos de eliminar, dar like y ver imagen
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

    // Asignamos las propiedades de la tarjeta (nombre y enlace)
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Llamamos a setEventListeners para asociar los eventos
    this._setEventListeners(cardElement);

    return cardElement;
  }
}

//