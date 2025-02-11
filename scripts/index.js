import { validateForm } from "./formValidator.js";
import { openModal, closeModal } from "./utils.js";
import { createCard } from "./card.js";

const pageFrame = document.querySelector(".page");

// Modal para agregar tarjetas
const addCardButton = document.querySelector(".add__card-button");
const modalTemplateAddCard = document.querySelector(".modal__box-template");
const modalCloneAddCard = modalTemplateAddCard.cloneNode(true).content;
const modalAddCard = modalCloneAddCard.querySelector(".modal");
const modalAddCardTitle = modalAddCard.querySelector(".modal__box-title");
const closeModalButtonAddCard = modalCloneAddCard.querySelector(".close-icon");
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
  pageFrame.append(modalAddCard);

  validateForm(modalAddCard);
}

function closeModalAddCard() {
  modalAddCard.remove();
}

addCardButton.addEventListener("click", openModalAddCard);
closeModalButtonAddCard.addEventListener("click", closeModalAddCard);

// Crear nuevas tarjetas correctamente
function submitCardInfo(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const imageUrl = urlLinkInput.value.trim();

  if (!imageUrl) {
    alert("Por favor ingresa una URL válida para la imagen.");
    return;
  }

  const newCard = { name: title, link: imageUrl };
  createCard(newCard);

  closeModalAddCard();
  titleInput.value = "";
  urlLinkInput.value = "";
}

submitButtonAddCard.addEventListener("click", submitCardInfo);

// Modal de edición de perfil
const editProfileButton = document.querySelector(
  ".profile__info-up-edit-button"
);
const modalCloneUserInfo = modalTemplateAddCard.cloneNode(true).content;
const modalUserInfo = modalCloneUserInfo.querySelector(".modal");
const modalUserInfoTitle = modalUserInfo.querySelector(".modal__box-title");
const modalUserInfoForm = modalUserInfo.querySelector(".modal__box-form");
const closeModalButtonUserInfo =
  modalCloneUserInfo.querySelector(".close-icon");

function openModalUserInfo() {
  modalUserInfoTitle.textContent = "Editar Perfil";
  modalUserInfoForm.querySelector("#input1").placeholder = "Nombre";
  modalUserInfoForm.querySelector("#input2").placeholder = "Acerca de mí";
  pageFrame.append(modalUserInfo);

  validateForm(modalUserInfo);
}

function closeModalUserInfo() {
  modalUserInfo.remove();
}

editProfileButton.addEventListener("click", openModalUserInfo);
closeModalButtonUserInfo.addEventListener("click", closeModalUserInfo);

// Guardar cambios en perfil
const nameInput = modalUserInfo.querySelector("#input1");
const professionInput = modalUserInfo.querySelector("#input2");
const newName = document.querySelector(".profile__info-up-name");
const newProfession = document.querySelector(".profile__info-down-profession");
const submitButtonUserInfo = modalUserInfo.querySelector(
  ".modal__box-form-button"
);

function submitUserInfo(event) {
  event.preventDefault();
  newName.textContent = nameInput.value;
  newProfession.textContent = professionInput.value;
  closeModalUserInfo();
}

submitButtonUserInfo.addEventListener("click", submitUserInfo);
