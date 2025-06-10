//FormValidator.js
export class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(".modal__box-form-button");
    this._inputList = Array.from(formElement.querySelectorAll(".modal__box-form-input"));
  }
  _showInputError(inputElement, errorMessage) {
    const errorId = `${inputElement.id}-error`;
    // Busca el elemento de error por ID o por clase
    const errorElement = this._formElement.querySelector(`#${errorId}`) || 
                        this._formElement.querySelector(`.${inputElement.id}-error`);
    
    if (errorElement) {
      inputElement.classList.add("modal__box-form-input-error");
      errorElement.classList.add("input-error-show");
      errorElement.textContent = errorMessage;
    }
  }
  _hideInputError(inputElement) {
    const errorId = `${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(`#${errorId}`) || 
                        this._formElement.querySelector(`.${inputElement.id}-error`);
    
    if (errorElement) {
      inputElement.classList.remove("modal__box-form-input-error");
      errorElement.classList.remove("input-error-show");
      errorElement.textContent = "";
    }
  }
_isValid(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
    return false;
  }

  // Validación especial para URLs de imagen
  if (inputElement.type === 'url') {
    try {
      new URL(inputElement.value); // Verifica que sea una URL válida
    } catch (e) {
      this._showInputError(inputElement, "Ingresa una URL válida");
      return false;
    }
  }
  
  this._hideInputError(inputElement);
  return true;
}
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
  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
//