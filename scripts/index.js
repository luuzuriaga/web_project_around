// index.js
import { Section } from "./Section.js";
import { Card } from "./archivo1.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./archivo2.js";

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

// Instancia PopupWithImage
const imagePopup = new PopupWithImage(".modal_image");
imagePopup.setEventListeners(); // Establece los escuchadores de eventos para el popup de imagen

// Función para crear una tarjeta
const createCard = (data) => {
  const card = new Card(data, ".post__template", (name, link) => {
    imagePopup.open(name, link);
  });// Pasamos imagePopup directamente
  return card.createCard();
};

// Instancia Section para renderizar tarjetas
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

document.addEventListener("DOMContentLoaded", () => {
  cardSection.renderItems();

  // Instancia UserInfo
  const userInfo = new UserInfo({
    nameSelector: ".profile__info-up-name",
    professionSelector: ".profile__info-down-profession",
  });

  // 📌 Clonar y añadir modal de editar perfil
  const editProfileTemplate = document.querySelector(
    ".modal__box-template"
  ).content;
  const editProfileModal = editProfileTemplate
    .querySelector(".modal")
    .cloneNode(true);
  editProfileModal.classList.add("modal_user");
  document.body.appendChild(editProfileModal);

  // Popup editar perfil
  const editProfilePopup = new PopupWithForm(editProfileModal, (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      profession: formData.profession,
    });
    editProfilePopup.close();
  });
  editProfilePopup.setEventListeners();

  // Botón abrir popup editar perfil
  const editProfileButton = document.querySelector(
    ".profile__info-up-edit-button"
  );

  editProfileButton.addEventListener("click", () => {
    const { name, profession } = userInfo.getUserInfo();
    editProfileModal.querySelector("#input1").value = name;
    editProfileModal.querySelector("#input2").value = profession;
    editProfilePopup.open();
  });

  // 📌 Clonar y añadir modal de agregar tarjeta
  const addCardTemplate = document.querySelector(
    ".modal__add-card-template"
  ).content;
  const addCardModal = addCardTemplate.querySelector(".modal").cloneNode(true);
  addCardModal.classList.add("modal_add");
  document.body.appendChild(addCardModal);

  // Popup agregar tarjeta
  const addCardPopup = new PopupWithForm(addCardModal, (formData) => {
    const newCard = createCard({ name: formData.title, link: formData.link });
    cardSection.addItem(newCard);
    addCardPopup.close();
  });
  addCardPopup.setEventListeners();

  // Botón abrir popup agregar tarjeta
  const addCardButton = document.querySelector(".add__card-button");
  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });

  // Validadores de formularios
  const editFormValidator = new FormValidator(
    editProfileModal.querySelector(".modal__box-form")
  );
  editFormValidator.enableValidation();

  const addFormValidator = new FormValidator(
    addCardModal.querySelector(".modal__box-form")
  );
  addFormValidator.enableValidation();
});