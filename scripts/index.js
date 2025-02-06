import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { openModal, closeModal } from "./utils.js";

const formConfig = {
  inputSelector: ".modal__box-form-input",
  submitButtonSelector: ".modal__box-form-submit",
  inactiveButtonClass: "modal__box-form-submit_inactive",
  inputErrorClass: "modal__box-form-input-error",
  errorClass: "input-error-show",
};

const formElement = document.querySelector(".modal__box-form");
const formValidator = new FormValidator(formConfig, formElement);
formValidator.enableValidation();

const cardData = [
  { title: "Card 1", image: "link_to_image1" },
  { title: "Card 2", image: "link_to_image2" },
];

cardData.forEach((data) => {
  const card = new Card(data, "#card-template");
  const cardElement = card.generateCard();
  document.querySelector(".cards").append(cardElement);
});

// Ejemplo de uso de las funciones de utilidades
const modal = document.querySelector(".modal");
document
  .querySelector(".open-modal-button")
  .addEventListener("click", () => openModal(modal));
document
  .querySelector(".close-modal-button")
  .addEventListener("click", () => closeModal(modal));
