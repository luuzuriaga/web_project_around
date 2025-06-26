//index.js
import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { api } from "./Api.js";

<<<<<<< HEAD
// Configuración inicial
const formValidators = {};
const cardsInstances = [];
=======
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
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1

// Inicialización de popups
const imagePopup = new PopupWithImage('.modal_image');
imagePopup.setEventListeners();

// Popup de confirmación
const confirmPopup = new PopupWithConfirmation(
  '#confirm-delete-template',
  (cardId, cardInstance) => {
    return api.deleteCard(cardId)
      .then(() => {
        cardInstance.remove();
        const index = cardsInstances.findIndex(c => c._id === cardId);
        if (index !== -1) cardsInstances.splice(index, 1);
      })
      .catch(showError)
      .finally(() => confirmPopup.close());
  }
);
confirmPopup.setEventListeners();

<<<<<<< HEAD
// Función para crear tarjetas
const createCard = (cardData, currentUserId) => {
  const card = new Card(
    { 
      ...cardData, 
      currentUserId 
    },
    '.post__template',
    (name, link) => imagePopup.open(name, link),
    (cardId, cardInstance) => confirmPopup.open(cardId, cardInstance),
    (cardId, isLiked) => api.toggleLike(cardId, isLiked)
  );
  
  const cardElement = card.createCard();
  cardsInstances.push(card);
  return cardElement;
=======
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
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1
};

// Sección de tarjetas
const cardSection = new Section(
  {
<<<<<<< HEAD
    items: [],
    renderer: (item, userId) => cardSection.addItem(createCard(item, userId))
=======
    items: initialCards,
    renderer: (item) => cardSection.addItem(createCard(item)),
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1
  },
  '.posts'
);

// Información del usuario
const userInfo = new UserInfo({
  nameSelector: '.profile__info-up-name',
  aboutSelector: '.profile__info-down-profession',
  avatarSelector: '.profile__avatar'
});

<<<<<<< HEAD
// Configuración de validación de formularios
const formConfig = {
  formSelector: '.modal__box-form',
  inputSelector: '.modal__box-form-input',
  submitButtonSelector: '.modal__box-form-button',
  inactiveButtonClass: 'modal__box-form-button-inactive',
  inputErrorClass: 'modal__box-form-input-error',
  errorClass: 'input-error-show'
};

const setupForm = (formElement) => {
  if (!formElement) return null;
  
  const validator = new FormValidator(formConfig, formElement);
  validator.enableValidation();
  formValidators[formElement.id] = validator;
  return validator;
};
=======
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
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1

// Popup de edición de perfil
const editProfilePopup = new PopupWithForm(
  '#edit-profile-template',
  (formData) => {
    editProfilePopup.showLoading(true);
    api.updateUserInfo({
      name: formData.name,
      about: formData.profession
    })
      .then(data => {
        userInfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch(showError)
      .finally(() => editProfilePopup.showLoading(false));
  }
);
editProfilePopup.setEventListeners();

<<<<<<< HEAD
// Popup para añadir tarjetas
const addCardPopup = new PopupWithForm(
  '#add-card-template',
  (formData) => {
    addCardPopup.showLoading(true);
    api.addNewCard({
      name: formData.title,
      link: formData.link
    })
      .then(newCard => {
        cardSection.addItem(createCard(newCard, userInfo.getUserId()));
        addCardPopup.close();
      })
      .catch(showError)
      .finally(() => addCardPopup.showLoading(false));
  }
);
addCardPopup.setEventListeners();

// Popup para cambiar avatar
const avatarPopup = new PopupWithForm(
  '#change-avatar-template',
  (formData) => {
    avatarPopup.showLoading(true, 'Actualizando...');
    
    if (!formData.avatarLink?.trim()) {
      showFormError('Ingresa una URL válida', 'avatar-form');
      avatarPopup.showLoading(false);
      return;
    }

    let avatarUrl = formData.avatarLink.trim();
    if (!avatarUrl.startsWith('http')) {
      avatarUrl = `https://${avatarUrl}`;
    }

    api.updateUserAvatar({ avatar: avatarUrl })
      .then(data => {
        if (!data.avatar) throw new Error('Avatar no recibido');
        userInfo.setUserAvatar(data.avatar);
        showFormSuccess('¡Avatar actualizado!', 'avatar-form');
        setTimeout(() => avatarPopup.close(), 1000);
      })
      .catch(err => {
        console.error('Error avatar:', err);
        showFormError('Error al actualizar. Intenta con otra imagen.', 'avatar-form');
      })
      .finally(() => avatarPopup.showLoading(false));
  }
);
avatarPopup.setEventListeners();

// Funciones auxiliares
function showError(err) {
  console.error(err);
  const errorElement = document.createElement('div');
  errorElement.className = 'global-error';
  errorElement.textContent = typeof err === 'string' ? err : 'Ocurrió un error';
  document.body.appendChild(errorElement);
  setTimeout(() => errorElement.remove(), 3000);
}

function showFormError(message, formId) {
  const form = document.getElementById(formId);
  const errorElement = form?.querySelector('.input-error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('input-error-show');
  }
}

function showFormSuccess(message, formId) {
  const form = document.getElementById(formId);
  const successElement = form?.querySelector('.modal__status-message');
  if (successElement) {
    successElement.textContent = message;
    successElement.style.color = '#2ecc71';
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  api.loadInitialData()
    .then(([userData, cards]) => {
      userInfo.setUserInfo(userData);
      cardsInstances.length = 0;
      cardSection.setItems(cards);
      cardSection.renderItems(userData._id);
      
      // Configurar validadores
      setupForm(document.getElementById('profile-form'));
      setupForm(document.getElementById('card-form'));
      setupForm(document.getElementById('avatar-form'));
    })
    .catch(showError);
});

// Event listeners
document.querySelector('.profile__info-up-edit-button')?.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  const form = document.getElementById('profile-form');
  if (form) {
    form.querySelector('#input1').value = userData.name;
    form.querySelector('#input2').value = userData.about;
    formValidators['profile-form']?.resetValidation();
  }
  editProfilePopup.open();
});

document.querySelector('.add__card-button')?.addEventListener('click', () => {
  formValidators['card-form']?.resetValidation();
  addCardPopup.open();
});

document.querySelector('.profile__edit-avatar')?.addEventListener('click', () => {
  const form = document.getElementById('avatar-form');
  if (form) {
    form.reset();
    formValidators['avatar-form']?.resetValidation();
    const errorElement = form.querySelector('.input-error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('input-error-show');
    }
  }
  avatarPopup.open();
});

=======
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
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1
