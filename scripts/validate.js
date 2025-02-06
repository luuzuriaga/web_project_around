function validateForm(element) {
  const formElement = element.querySelector(".modal__box-form");
  const closeElement = element.querySelector(".close-icon");
  const buttonElement = element.querySelector(".modal__box-form-button");

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorMsg = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add("modal__box-form-input-error");
    errorMsg.classList.add("input-error-show");
    errorMsg.textContent = errorMessage;
  };

  const hideInputError = (formElement, inputElement) => {
    const errorMsg = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove("modal__box-form-input-error");
    errorMsg.classList.remove("input-error-show");
    errorMsg.textContent = "";
  };

  const isValid = (formElement, inputElement) => {
    if (inputElement.validity.tooShort) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else if (inputElement.validity.valueMissing) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else if (inputElement.validity.typeMismatch) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(".modal__box-form-input")
    );

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);

        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("modal__box-form-button-inactive");
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove("modal__box-form-button-inactive");
      buttonElement.disabled = false;
    }
  };

  closeElement.addEventListener("click", () => {
    formElement.reset();
  });

  buttonElement.addEventListener("click", () => {
    formElement.reset();
  });

  setEventListeners(formElement);
}
