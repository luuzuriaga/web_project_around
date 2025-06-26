//PopupWithConfirmation.js
import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(templateSelector, handleConfirm) {
    const template = document.querySelector(templateSelector);
    if (!template) {
      console.error(`Template no encontrado: ${templateSelector}`);
      return;
    }

    const popupElement = template.content.cloneNode(true).querySelector('.modal');
    if (!popupElement) {
      console.error('No se pudo crear el popup desde el template');
      return;
    }

    document.body.appendChild(popupElement);
    super(popupElement);

    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popup.querySelector('.modal__confirm-button');
    this._cardId = null;
    this._cardInstance = null;

    if (this._confirmButton) {
      this._confirmButton.addEventListener('click', () => {
        if (this._cardId && this._cardInstance && this._handleConfirm) {
          this._handleConfirm(this._cardId, this._cardInstance);
        }
      });
    }
  }

  open(cardId, cardInstance) {
    this._cardId = cardId;
    this._cardInstance = cardInstance;
    super.open();
  }

  close() {
    this._cardId = null;
    this._cardInstance = null;
    super.close();
  }
}
