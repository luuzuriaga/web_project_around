export class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(".modal__box-form-button");
    this._inputList = [
      ...formElement.querySelectorAll(".modal__box-form-input"),
    ];
  }

  // Mostrar mensaje de error
  _showInputError(inputElement, errorMessage) {
    const errorMsg = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add("modal__box-form-input-error");
    errorMsg.classList.add("input-error-show");
    errorMsg.textContent = errorMessage;
  }

  // Ocultar mensaje de error
  _hideInputError(inputElement) {
    const errorMsg = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove("modal__box-form-input-error");
    errorMsg.classList.remove("input-error-show");
    errorMsg.textContent = "";
  }

  // Validar un campo
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Habilitar o deshabilitar el botón de enviar
  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (input) => !input.validity.valid
    );
    this._buttonElement.disabled = hasInvalidInput;
    this._buttonElement.classList.toggle(
      "modal__box-form-button-inactive",
      hasInvalidInput
    );
  }

  // Agregar eventos a los inputs
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("reset", () => {
      this._inputList.forEach((input) => this._hideInputError(input));
      this._toggleButtonState();
    });
  }

  // Inicializar validación del formulario
  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState(); // Validar estado inicial del botón
  }
}
