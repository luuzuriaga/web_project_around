// src/index.js
import { Section } from "./scripts/Section.js";
import { Card } from "./scripts/Card.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { FormValidator } from "./scripts/formValidator.js";

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

// Función para crear una tarjeta y devolver el elemento DOM
const createCard = (data) => {
  const card = new Card(data, ".post__template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.createCard();
};

// Instancia de Section para renderizar tarjetas
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

cardSection.renderItems();

// Instancia UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__info-up-name",
  professionSelector: ".profile__info-down-profession",
});

// Popup para editar perfil
const editProfilePopup = new PopupWithForm(".modal_user", (formData) => {
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
  document.querySelector(".modal_user #input1").value = name;
  document.querySelector(".modal_user #input2").value = profession;
  editProfilePopup.open();
});

// Popup para agregar tarjeta
const addCardPopup = new PopupWithForm(".modal_add", (formData) => {
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

// Popup de imagen
const imagePopup = new PopupWithImage(".modal_image");
imagePopup.setEventListeners();

// Validadores de formularios
const editFormValidator = new FormValidator(
  document.querySelector(".modal_user .modal__box-form")
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  document.querySelector(".modal_add .modal__box-form")
);
addFormValidator.enableValidation();
