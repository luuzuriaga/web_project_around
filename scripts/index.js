import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { openModal, closeModal, enableModalEventListeners } from "./utils.js";

const pageFrame = document.querySelector(".page");

// Datos iniciales de las tarjetas
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

// Activar eventos globales para modales
enableModalEventListeners(); // Permitir Escape y clics para cerrar modales

// Renderizar tarjetas iniciales
Card.renderInitialCards(initialCards, ".posts", ".post__template");

// Modal para agregar tarjetas
const addCardButton = document.querySelector(".add__card-button");
const modalTemplateAddCard = document.querySelector(".modal__box-template");
const modalCloneAddCard = modalTemplateAddCard.cloneNode(true).content;
const modalAddCard = modalCloneAddCard.querySelector(".modal");
const modalAddCardTitle = modalAddCard.querySelector(".modal__box-title");
const titleInput = modalAddCard.querySelector("#input1");
const urlLinkInput = modalAddCard.querySelector("#input2");
const submitButtonAddCard = modalAddCard.querySelector(
  ".modal__box-form-button"
);

function openModalAddCard() {
  modalAddCardTitle.textContent = "Nuevo Lugar";
  modalAddCard.querySelector("#input1").placeholder = "Título";
  modalAddCard.querySelector("#input2").placeholder = "URL de la imagen";
  modalAddCard.querySelector("#input2").type = "url";
  openModal(modalAddCard); // Usar la función de apertura global
  addCardFormValidator.enableValidation(); // Iniciar validación del formulario
}

addCardButton.addEventListener("click", openModalAddCard);

// Crear nuevas tarjetas
function submitCardInfo(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const imageUrl = urlLinkInput.value.trim();

  if (!imageUrl) {
    alert("Por favor ingresa una URL válida para la imagen.");
    return;
  }

  const newCard = new Card({ name: title, link: imageUrl }, ".post__template");
  const cardElement = newCard.createCard();

  const postsCardsContainer = document.querySelector(".posts");
  postsCardsContainer.prepend(cardElement); // Agregar al contenedor de tarjetas

  closeModal(modalAddCard); // Usar la función de cierre global
  titleInput.value = "";
  urlLinkInput.value = "";
}

submitButtonAddCard.addEventListener("click", submitCardInfo);

// Instanciar validador para el formulario de agregar tarjeta
const addCardFormValidator = new FormValidator(
  modalAddCard.querySelector(".modal__box-form")
);
addCardFormValidator.enableValidation();

// Modal de edición de perfil
const editProfileButton = document.querySelector(
  ".profile__info-up-edit-button"
);
const modalCloneUserInfo = modalTemplateAddCard.cloneNode(true).content; // Clonar de manera independiente
const modalUserInfo = modalCloneUserInfo.querySelector(".modal");
const modalUserInfoTitle = modalUserInfo.querySelector(".modal__box-title");
const modalUserInfoForm = modalUserInfo.querySelector(".modal__box-form");
const nameInput = modalUserInfoForm.querySelector("#input1");
const professionInput = modalUserInfoForm.querySelector("#input2");
const submitButtonUserInfo = modalUserInfo.querySelector(
  ".modal__box-form-button"
);

function openModalUserInfo() {
  modalUserInfoTitle.textContent = "Editar Perfil";
  nameInput.placeholder = "Nombre"; // Cambiar el contenido del placeholder
  professionInput.placeholder = "Acerca de mí";
  nameInput.value = newName.textContent; // Prellenar el formulario con datos actuales
  professionInput.value = newProfession.textContent;
  openModal(modalUserInfo); // Usar la función de apertura global
  editProfileFormValidator.enableValidation(); // Iniciar validación del formulario
}

// Guardar cambios en perfil
const newName = document.querySelector(".profile__info-up-name");
const newProfession = document.querySelector(".profile__info-down-profession");

function submitUserInfo(event) {
  event.preventDefault();
  newName.textContent = nameInput.value;
  newProfession.textContent = professionInput.value;
  closeModal(modalUserInfo); // Usar la función de cierre global
}

submitButtonUserInfo.addEventListener("click", submitUserInfo);
editProfileButton.addEventListener("click", openModalUserInfo);

// Instanciar validador para el formulario de editar perfil
const editProfileFormValidator = new FormValidator(modalUserInfoForm);
editProfileFormValidator.enableValidation();
