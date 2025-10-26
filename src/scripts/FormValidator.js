//FormValidator.js
export class FormValidator {
  constructor(config, formElement) {
    if (!formElement || !(formElement instanceof HTMLElement)) {
      throw new Error('Elemento de formulario no válido');
    }

    this._config = {
      formSelector: '.form',
      inputSelector: '.form__input',
      submitButtonSelector: '.form__submit',
      inactiveButtonClass: 'form__submit_disabled',
      inputErrorClass: 'form__input_type_error',
      errorClass: 'form__error_visible',
      ...config
    };

    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    if (!this._buttonElement) {
      console.warn(`Botón no encontrado con selector: ${this._config.submitButtonSelector}`);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) return;

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) return;

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._inputList.forEach(inputElement => {
          this._hideInputError(inputElement);
        });
        this._toggleButtonState();
      }, 0);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}