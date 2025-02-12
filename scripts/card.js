import { openModal } from "./utils.js";

export class Card {
  constructor({ name, link }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  // Método para obtener el contenido del template
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    return cardTemplate.cloneNode(true);
  }

  // Método para manejar el botón de borrar
  _handleDeleteCard(event) {
    event.target.closest(".post").remove();
  }

  // Método para manejar el botón de like
  _handleLikeButton(event) {
    const likeButton = event.target;
    likeButton.alt = likeButton.alt === "Not liked" ? "Liked" : "Not liked";
    likeButton.src =
      likeButton.alt === "Liked"
        ? "./images/heart-icon-black.svg"
        : "./images/heart-icon.svg";
  }

  // Método para manejar el clic en la imagen (expandir modal)
  _handleImageClick() {
    const modalCardTemplate = document.querySelector(".modal__card-template");
    const modalCardClone = modalCardTemplate.cloneNode(true).content;
    const modalCard = modalCardClone.querySelector(".modal");
    const cardImage = modalCard.querySelector(".modal__card-image");
    const cardTitle = modalCard.querySelector(".modal__card-title");

    // Asignar datos al modal
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Abrir el modal
    document.body.append(modalCard);
  }

  // Método para agregar eventos
  _setEventListeners(cardElement) {
    // Botón de borrar
    cardElement
      .querySelector(".trash-button")
      .addEventListener("click", (event) => this._handleDeleteCard(event));

    // Botón de like
    cardElement
      .querySelector(".heart-icon")
      .addEventListener("click", (event) => this._handleLikeButton(event));

    // Imagen (expandir modal)
    cardElement
      .querySelector(".post__picture")
      .addEventListener("click", () => this._handleImageClick());
  }

  // Método para crear la tarjeta
  createCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".post__picture");
    const cardTitle = cardElement.querySelector(".post__info-bar-name");

    // Asignar datos a la tarjeta
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Agregar eventos
    this._setEventListeners(cardElement);

    return cardElement;
  }

  // Método estático para inicializar las tarjetas iniciales
  static renderInitialCards(cardsData, containerSelector, templateSelector) {
    const container = document.querySelector(containerSelector);
    cardsData.forEach((cardData) => {
      const card = new Card(cardData, templateSelector);
      const cardElement = card.createCard();
      container.append(cardElement);
    });
  }
}
