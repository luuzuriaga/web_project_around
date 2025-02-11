export function validateForm(element) {
  const formElement = element.querySelector(".modal__box-form");
  const buttonElement = element.querySelector(".modal__box-form-button");

  function showInputError(inputElement, errorMessage) {
    const errorMsg = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("modal__box-form-input-error");
    errorMsg.classList.add("input-error-show");
    errorMsg.textContent = errorMessage;
  }

  function hideInputError(inputElement) {
    const errorMsg = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("modal__box-form-input-error");
    errorMsg.classList.remove("input-error-show");
    errorMsg.textContent = "";
  }

  function isValid(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
  }

  function toggleButtonState(inputList) {
    buttonElement.disabled = inputList.some((input) => !input.validity.valid);
    buttonElement.classList.toggle(
      "modal__box-form-button-inactive",
      buttonElement.disabled
    );
  }

  const inputList = [...formElement.querySelectorAll(".modal__box-form-input")];

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement);
      toggleButtonState(inputList);
    });
  });

  formElement.addEventListener("reset", () => {
    inputList.forEach(hideInputError);
    toggleButtonState(inputList);
  });

  toggleButtonState(inputList);
}
