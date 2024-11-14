// validate.js

export function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);

    // Añade el evento input a cada campo de entrada
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input, inputErrorClass, errorClass);
        toggleButtonState(inputs, submitButton, inactiveButtonClass);
      });
    });
  });
}

function checkInputValidity(form, input, inputErrorClass, errorClass) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    input.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = input.validationMessage;
  } else {
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
  if (inputs.every((input) => input.validity.valid)) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  }
}
