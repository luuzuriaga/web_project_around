// index.js

// Importación de clases necesarias
import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";

// Datos iniciales de las tarjetas
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    _id: "card-1",
    likes: [],
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    _id: "card-2",
    likes: [],
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    _id: "card-3",
    likes: [],
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    _id: "card-4",
    likes: [],
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    _id: "card-5",
    likes: [],
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    _id: "card-6",
    likes: [],
  },
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
  const card = new Card(
    {
      ...data,
      _id: data._id || `card-${Date.now()}`,
    },
    ".post__template",
    (name, link) => imagePopup.open(name, link),
    (cardId) => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardElement) confirmPopup.open(cardElement);
    },
    async (cardId, shouldLike) => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      const heartIcon = cardElement?.querySelector(".heart-icon");

      if (heartIcon) {
        heartIcon.classList.toggle("heart-icon_active", shouldLike);
        if (shouldLike) {
          heartIcon.classList.add("heart-icon_animate");
          setTimeout(() => heartIcon.classList.remove("heart-icon_animate"), 300);
        }
      }

      // Simulación de API
      console.log(`Like ${shouldLike ? "activado" : "desactivado"} para ${cardId}`);
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, isLiked: shouldLike }), 300);
      });
    }
  );
  return card.createCard();
};

// Crear instancia de Section para manejar el renderizado de tarjetas
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => cardSection.addItem(createCard(item)),
  },
  ".posts"
);

// Ejecutar después de que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  cardSection.renderItems();

  // Modificación en UserInfo para manejar el avatar
  const userInfo = new UserInfo({
    nameSelector: ".profile__info-up-name",
    professionSelector: ".profile__info-down-profession",
    avatarSelector: ".profile__avatar-wrapper .profile__avatar" // Selector específico sin cambiar HTML
  });

  // ----------- POPUP EDITAR PERFIL -----------
  const editProfileModal = document.querySelector(".modal__box-template").content
    .querySelector(".modal").cloneNode(true);
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

  document.querySelector(".profile__info-up-edit-button").addEventListener("click", () => {
    const { name, profession } = userInfo.getUserInfo();
    editProfileModal.querySelector("#input1").value = name;
    editProfileModal.querySelector("#input2").value = profession;
    editProfilePopup.open();
  });

  // ----------- POPUP AÑADIR TARJETA -----------
  const addCardModal = document.querySelector(".modal__add-card-template").content
    .querySelector(".modal").cloneNode(true);
  addCardModal.classList.add("modal_add");
  document.body.appendChild(addCardModal);

  const addCardPopup = new PopupWithForm(addCardModal, (formData) => {
    cardSection.addItem(createCard({
      name: formData.title,
      link: formData.link,
      _id: `new-${Date.now()}`,
    }));
    addCardPopup.close();
  });
  addCardPopup.setEventListeners();

  document.querySelector(".add__card-button").addEventListener("click", () => addCardPopup.open());

  // ----------- POPUP ACTUALIZAR AVATAR (VERSIÓN SIMPLIFICADA) -----------
  const avatarModal = document.querySelector("template.modal__avatar-template").content
    .querySelector(".modal").cloneNode(true);
  document.body.appendChild(avatarModal);

  const avatarPopup = new PopupWithForm(avatarModal, (formData) => {
    const testImage = new Image();
    testImage.onload = () => {
      userInfo.setUserAvatar(formData.avatarLink);
      localStorage.setItem("userAvatar", formData.avatarLink);
      avatarPopup.close();
    };
    testImage.onerror = () => {
      const errorElement = avatarModal.querySelector("#avatar-input-error");
      errorElement.textContent = "No se pudo cargar la imagen. Verifica el enlace.";
      errorElement.classList.add("input-error-show");
    };
    testImage.src = formData.avatarLink;
  });

  // Configurar eventos para el avatar
  const setupAvatarEvents = () => {
    avatarPopup.setEventListeners();
    new FormValidator(avatarModal.querySelector(".modal__box-form")).enableValidation();

    const openAvatarPopup = (e) => {
      e?.preventDefault();
      avatarPopup.open();
      avatarModal.querySelector("#avatar-input-error").textContent = "";
    };

    document.querySelector(".profile__edit-avatar").addEventListener("click", openAvatarPopup);
    document.querySelector(".profile__avatar-overlay").addEventListener("click", openAvatarPopup);

    // Cargar avatar guardado si existe
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      document.querySelector(".profile__avatar-wrapper .profile__avatar").src = savedAvatar;
    }
  };

  // Verificar que existan los elementos antes de configurar eventos
  if (document.querySelector(".profile__edit-avatar") && document.querySelector(".profile__avatar-overlay")) {
    setupAvatarEvents();
  }
});