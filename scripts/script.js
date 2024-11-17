const pageFrame = document.querySelector(".page");

//Initial Cards

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
    name: "MontaÃ±as Calvas",
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

initialCards.forEach((card) => {
  const clonedCard = cardTemplate.cloneNode(true).content;
  const cardPicture = clonedCard.querySelector(".post__picture");
  const cardTitle = clonedCard.querySelector(".post__info-bar-name");
  cardPicture.src = card.link;
  cardPicture.alt = card.name;
  cardTitle.textContent = card.name;

  postsCardsContainer.append(clonedCard);
});

//Open and close modal for adding new cards

const addCardButton = document.querySelector(".add__card-button");
const modalTemplateAddCard = document.querySelector(".modal__box-template");
const modalCloneAddCard = modalTemplateAddCard.cloneNode(true).content;
const modalAddCard = modalCloneAddCard.querySelector(".modal");
const modalAddCardTitle = modalAddCard.querySelector(".modal__box-title");
const closeModalButtonAddCard = modalCloneAddCard.querySelector(".close-icon");

function openModalAddCard() {
  modalAddCardTitle.textContent = "Nuevo Lugar";
  modalAddCard.querySelector("#input1").placeholder = "TÃ­tulo";
  modalAddCard.querySelector("#input2").placeholder = "URL de la imagen";
  modalAddCard.querySelector("#input2").type = "url";
  pageFrame.append(modalAddCard);

  validateForm(modalAddCard);
}

modalAddCard.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("close-icon")
  ) {
    closeModalAddCard();
  }
});

function closeModalAddCard() {
  modalAddCard.remove();
}

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closeModalAddCard();
  }
});

addCardButton.addEventListener("click", openModalAddCard);
closeModalButtonAddCard.addEventListener("click", closeModalAddCard);

//Create new card

const titleInput = modalAddCard.querySelector("#input1");
const urlLinkInput = modalAddCard.querySelector("#input2");
const cloneAddCard = cardTemplate.cloneNode(true).content;
const newTitle = cloneAddCard.querySelector(".post__info-bar-name");
const newImage = cloneAddCard.querySelector(".post__picture");
const submitButtonAddCard = modalAddCard.querySelector(
  ".modal__box-form-button"
);

function submitCardInfo(event) {
  event.preventDefault();

  newTitle.textContent = titleInput.value;
  newImage.src = urlLinkInput.value;
  postsCardsContainer.prepend(cloneAddCard);
  closeModalAddCard();
}

submitButtonAddCard.addEventListener("click", submitCardInfo);

//Open and close editing user info modal

const editProfileButton = document.querySelector(
  ".profile__info-up-edit-button"
);
const modalTemplateUserInfo = document.querySelector(".modal__box-template");
const modalCloneUserInfo = modalTemplateUserInfo.cloneNode(true).content;
const modalUserInfo = modalCloneUserInfo.querySelector(".modal");
const modalUserInfoTitle = modalUserInfo.querySelector(".modal__box-title");
const modalUserInfoForm = modalUserInfo.querySelector(".modal__box-form");
const closeModalButtonUserInfo =
  modalCloneUserInfo.querySelector(".close-icon");

function openModalUserInfo() {
  modalUserInfoTitle.textContent = "Editar Perfil";
  modalUserInfoForm.querySelector("#input1").placeholder = "Nombre";
  modalUserInfoForm.querySelector("#input2").placeholder = "Acerca de mÃ­";
  modalUserInfoForm.name = "UserInfoForm";
  pageFrame.append(modalUserInfo);

  validateForm(modalUserInfo);
}

modalUserInfo.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("close-icon")
  ) {
    closeModalUserInfo();
  }
});

function closeModalUserInfo() {
  modalUserInfo.remove();
}

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closeModalUserInfo();
  }
});

editProfileButton.addEventListener("click", openModalUserInfo);
closeModalButtonUserInfo.addEventListener("click", closeModalUserInfo);

//Change user info

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

//Erase cards

postsCardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("trash-button")) {
    const eraseCardButton = event.target;
    eraseCardButton.closest(".post").remove();
  }
});

//Like or dislike posts

postsCardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("heart-icon")) {
    const currentIcon = event.target;

    if (currentIcon.alt === "Not liked") {
      currentIcon.alt = "Liked";
      currentIcon.src = "./images/heart-icon-black.svg";
    } else {
      currentIcon.alt = "Not liked";
      currentIcon.src = "./images/heart-icon.svg";
    }
  }
});

//Open and close expanded post picture

const modalCardTemplate = document.querySelector(".modal__card-template");
const modalCardClone = modalCardTemplate.cloneNode(true).content;
const modalCard = modalCardClone.querySelector(".modal");
const cardImagesList = document.querySelectorAll(".post__picture");
const cardImagesArray = Array.from(cardImagesList);
const cardImage = modalCardClone.querySelector(".modal__card-image");
const cardTitle = modalCardClone.querySelector(".modal__card-title");
const closeCardModalButton = modalCardClone.querySelector(".close-icon");

postsCardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("post__picture")) {
    const currentCardImage = event.target;
    const currentCardTitle =
      currentCardImage.nextElementSibling.firstElementChild.textContent;

    cardImage.src = currentCardImage.src;
    cardImage.alt = currentCardTitle;
    cardTitle.textContent = currentCardTitle;

    pageFrame.append(modalCard);
  }
});

closeCardModalButton.addEventListener("click", function () {
  modalCard.remove();
});

modalCard.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("close-icon")
  ) {
    modalCard.remove();
  }
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    modalCard.remove();
  }
});