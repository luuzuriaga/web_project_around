// PopupWithConfirmation.js
import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    const template = document.querySelector(popupSelector);
    const popupElement = template.content.cloneNode(true).querySelector(".modal");
    document.body.appendChild(popupElement); // lo insertamos una sola vez al inicio

    super(popupElement); // llamamos al constructor de Popup con el modal ya clonado
    this._handleConfirm = handleConfirm;

    this._confirmButton = this._popup.querySelector(".modal__confirm-button");
    this._closeButton = this._popup.querySelector(".close-icon");

    this._cardElement = null; // para saber qué tarjeta eliminar
  }

  open(cardElement) {
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm && this._cardElement) {
        this._handleConfirm(this._cardElement);
        this._cardElement = null;
        this.close();
      }
    });
  }
}