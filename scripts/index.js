import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { openModal, closeModal } from "./utils.js";

// Exponer la clase Card al ámbito global para pruebas en la consola
window.Card = Card;

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
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
