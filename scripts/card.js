import { openModal, closeModal } from "./utils.js";

const postsCardsContainer = document.querySelector(".posts");
const cardTemplate = document.querySelector(".post__template");

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

export function createCard(card) {
  const clonedCard = cardTemplate.cloneNode(true).content;
  const cardPicture = clonedCard.querySelector(".post__picture");
  const cardTitle = clonedCard.querySelector(".post__info-bar-name");
  cardPicture.src = card.link;
  cardPicture.alt = card.name;
  cardTitle.textContent = card.name;
  postsCardsContainer.append(clonedCard);
}

initialCards.forEach(createCard);

postsCardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("trash-button")) {
    event.target.closest(".post").remove();
  }

  if (event.target.classList.contains("heart-icon")) {
    const currentIcon = event.target;
    currentIcon.alt = currentIcon.alt === "Not liked" ? "Liked" : "Not liked";
    currentIcon.src =
      currentIcon.alt === "Liked"
        ? "./images/heart-icon-black.svg"
        : "./images/heart-icon.svg";
  }

  if (event.target.classList.contains("post__picture")) {
    openModal(event.target);
  }
});
