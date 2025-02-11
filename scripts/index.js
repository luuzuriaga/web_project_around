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

function openModalAddCard() {
  modalAddCardTitle.textContent = "Nuevo Lugar";
  modalAddCard.querySelector("#input1").placeholder = "Título";
  modalAddCard.querySelector("#input2").placeholder = "URL de la imagen";
  modalAddCard.querySelector("#input2").type = "url";
  pageFrame.append(modalAddCard);

  validateForm(modalAddCard);
}

addCardButton.addEventListener("click", openModalAddCard);
closeModalButtonAddCard.addEventListener("click", closeModal);

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

editProfileButton.addEventListener("click", openModalUserInfo);
closeModalButtonUserInfo.addEventListener("click", closeModal);

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
  modalUserInfo.remove();
}

submitButtonUserInfo.addEventListener("click", submitUserInfo);
