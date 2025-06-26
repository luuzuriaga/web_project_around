//PopupWithForm.js
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(templateSelector, handleFormSubmit) {
    const template = document.querySelector(templateSelector);
    const popupElement = template.content.cloneNode(true).querySelector('.modal');
    document.body.appendChild(popupElement);
    super(popupElement);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.modal__box-form');
    this._inputList = this._form ? [...this._form.querySelectorAll('.modal__box-form-input')] : [];
    this._submitButton = this._form ? this._form.querySelector('.modal__box-form-button') : null;
    this._submitButtonText = this._submitButton ? this._submitButton.textContent : '';

    if (this._form) {
      this._form.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  showLoading(isLoading, loadingText = 'Guardando...') {
    if (!this._submitButton) return;
    
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._submitButtonText;
      this._submitButton.disabled = false;
    }
  }

  close() {
    super.close();
    if (this._form) {
      this._form.reset();
    }
  }
}