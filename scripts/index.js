//index.js
import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { api } from "./Api.js";

// Configuración inicial
const formValidators = {};
const cardsInstances = [];

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
};

// Sección de tarjetas
const cardSection = new Section(
  {
    items: [],
    renderer: (item, userId) => cardSection.addItem(createCard(item, userId))
  },
  '.posts'
);

// Información del usuario
const userInfo = new UserInfo({
  nameSelector: '.profile__info-up-name',
  aboutSelector: '.profile__info-down-profession',
  avatarSelector: '.profile__avatar'
});

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

