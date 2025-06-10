// index.js

// Importación de clases necesarias
import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";

// Datos iniciales de las tarjetas que se mostrarán al cargar la página
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" },
];

// Crear instancia del popup de imagen
const imagePopup = new PopupWithImage(".modal_image");
imagePopup.setEventListeners();

// Crear instancia del popup de confirmación para eliminar tarjetas
const confirmPopup = new PopupWithConfirmation(
  ".modal__confirm-delete-template",
  (cardElement) => {
    cardElement.remove();
  }
);
confirmPopup.setEventListeners();

// Función para crear una nueva tarjeta
const createCard = (data) => {
  const card = new Card(data, ".post__template", (name, link) => {
    imagePopup.open(name, link);
  });

  const cardElement = card.createCard();

  const trashIcon = cardElement.querySelector(".trash-icon");
  if (trashIcon) {
    trashIcon.addEventListener("click", () => {
      confirmPopup.open(cardElement);
    });
  }

  return cardElement;
};

// Crear instancia de Section para manejar el renderizado de tarjetas
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".posts"
);

// Ejecutar después de que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  cardSection.renderItems();

  const userInfo = new UserInfo({
    nameSelector: ".profile__info-up-name",
    professionSelector: ".profile__info-down-profession",
  });

  // ----------- POPUP EDITAR PERFIL -----------
  const editProfileTemplate = document.querySelector(".modal__box-template").content;
  const editProfileModal = editProfileTemplate.querySelector(".modal").cloneNode(true);
  editProfileModal.classList.add("modal_user");
  document.body.appendChild(editProfileModal);

  const editProfilePopup = new PopupWithForm(editProfileModal, (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      profession: formData.profession,
    });
    editProfilePopup.close();
  });
  editProfilePopup.setEventListeners();

  const editProfileButton = document.querySelector(".profile__info-up-edit-button");
  editProfileButton.addEventListener("click", () => {
    const { name, profession } = userInfo.getUserInfo();
    editProfileModal.querySelector("#input1").value = name;
    editProfileModal.querySelector("#input2").value = profession;
    editProfilePopup.open();
  });

  // ----------- POPUP AÑADIR TARJETA -----------
  const addCardTemplate = document.querySelector(".modal__add-card-template").content;
  const addCardModal = addCardTemplate.querySelector(".modal").cloneNode(true);
  addCardModal.classList.add("modal_add");
  document.body.appendChild(addCardModal);

  const addCardPopup = new PopupWithForm(addCardModal, (formData) => {
    const newCard = createCard({ name: formData.title, link: formData.link });
    cardSection.addItem(newCard);
    addCardPopup.close();
  });
  addCardPopup.setEventListeners();

  const addCardButton = document.querySelector(".add__card-button");
  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });

 // ----------- POPUP ACTUALIZAR AVATAR -----------
const avatarTemplate = document.querySelector("template.modal__avatar-template");

if (avatarTemplate) {
  const avatarModal = avatarTemplate.content.querySelector(".modal").cloneNode(true);
  document.body.appendChild(avatarModal);

const avatarPopup = new PopupWithForm(avatarModal, (formData) => {
    console.log("Buscando imagen de perfil...");
    const profileImg = document.querySelector(".profile__avatar");
    console.log("Elemento encontrado:", profileImg);
    
    if (profileImg && formData.avatarLink) {
      // Creamos una imagen temporal para verificar que se carga correctamente
      const testImage = new Image();
      testImage.onload = () => {
        // La imagen se carga correctamente
        profileImg.src = formData.avatarLink;

        // Opcional: Guardar en localStorage para persistencia
        localStorage.setItem('userAvatar', formData.avatarLink);

        avatarPopup.close();
        
      console.log("Avatar actualizado correctamente:", formData.avatarLink);
    };

      // 3. Definimos qué pasa si hay error al cargar la imagen
      testImage.onerror = () => {
        // Mostrar error si la imagen no se puede cargar
        const errorElement = avatarModal.querySelector("#avatar-input-error");
        if (errorElement) {
          errorElement.textContent = "No se pudo cargar la imagen. Verifica el enlace.";
          errorElement.classList.add("input-error-show");
        }
        console.error("Error al cargar la imagen:", formData.avatarLink);
        // IMPORTANTE: NO hacemos return aquí, el popup sigue abierto para corrección
      };
      // 4. Intentamos cargar la imagen (dispara onload/onerror)
      testImage.src = formData.avatarLink;
    }
  });

  // Configuración del validador
  const avatarForm = avatarModal.querySelector(".modal__box-form");
  if (avatarForm) {
    new FormValidator(avatarForm).enableValidation();
  }

  // Eventos para abrir el modal
  const editAvatarBtn = document.querySelector(".profile__edit-avatar");
  const avatarOverlay = document.querySelector(".profile__avatar-overlay");

  if (editAvatarBtn) {
    editAvatarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      avatarPopup.open();
      // Limpiar errores al abrir
      const errorElement = avatarModal.querySelector("#avatar-input-error");
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove("input-error-show");
      }
    });
  }

  if (avatarOverlay) {
    avatarOverlay.addEventListener("click", (e) => {
      e.preventDefault();
      avatarPopup.open();
    });
  }

  // Cargar avatar guardado si existe (opcional)
  const savedAvatar = localStorage.getItem('userAvatar');
  if (savedAvatar) {
    document.querySelector(".profile__avatar").src = savedAvatar;
  }
}})