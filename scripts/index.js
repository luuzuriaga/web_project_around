import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

const initialCards = [
  { name: "Valle de Yosemite", link: "https://.../yosemite.jpg" },
  { name: "Lago Louise", link: "https://.../lake-louise.jpg" },
];

const cardContainer = document.querySelector(".posts");
initialCards.forEach((data) => {
  const card = new Card(data.name, data.link, ".post__template");
  cardContainer.append(card.getCard());
});

const formConfig = {
  inputSelector: ".modal__box-form-input",
  submitButtonSelector: ".modal__box-form-button",
  inactiveButtonClass: "modal__box-form-button-inactive",
  inputErrorClass: "modal__box-form-input-error",
};

document.querySelectorAll(".modal__box-form").forEach((form) => {
  const validator = new FormValidator(formConfig, form);
  validator.enableValidation();
});
