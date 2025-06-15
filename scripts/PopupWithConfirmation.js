//PopupWithConfirmation.js
import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    // Busca el template solo una vez
    const template = document.querySelector(popupSelector);
    if (!template) {
      throw new Error(`Template no encontrado: ${popupSelector}`);
    }

    // Clona el template solo si no existe ya en el DOM
    let popupElement = document.querySelector(`${popupSelector}-instance`);
    if (!popupElement) {
      popupElement = template.content.cloneNode(true).querySelector(".modal");
      popupElement.id = `${popupSelector}-instance`;
      document.body.appendChild(popupElement);
    }

    super(popupElement);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popup.querySelector(".modal__confirm-button");
    this._itemToConfirm = null; // Más genérico que solo cardElement

    // Bind para mantener el contexto
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
  }

  open(item) {
    this._itemToConfirm = item;
    super.open();
  }

  close() {
    super.close();
    this._itemToConfirm = null;
  }

  _handleConfirmClick() {
    if (this._handleConfirm && this._itemToConfirm) {
      this._handleConfirm(this._itemToConfirm);
      this.close();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this._handleConfirmClick);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._confirmButton.removeEventListener("click", this._handleConfirmClick);
  }
}