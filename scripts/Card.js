
//Card.js
export class Card {
  constructor({ name, link, _id, likes = [] }, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._id = _id || `card-${Math.random().toString(16).slice(2)}`;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardElement = null;
    this._isLiked = false;
    this._likes = likes;
    this._likeButton = null;
    this._likeCountElement = null;
    this._isProcessingLike = false; // Bandera para prevenir doble clic
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector)?.content?.querySelector('.post');
    if (!template) {
      console.error('Template no encontrado');
      return null;
    }
    return template.cloneNode(true);
  }

  _handleLikeButton = (e) => {
    e.stopPropagation(); // Detiene la propagación del evento
    
    if (this._isProcessingLike) return;
    this._isProcessingLike = true;
    
    const newLikeState = !this._isLiked;
    this._toggleLike(); // Cambio visual inmediato
    
    if (typeof this._handleLikeClick === 'function') {
      this._handleLikeClick(this._id, newLikeState)
        .then(updatedCard => {
          this._isLiked = updatedCard.isLiked;
          this._likes = updatedCard.likes || [];
          this._updateLikeUI();
        })
        .catch(error => {
          console.error("Error al actualizar like:", error);
          this._toggleLike(); // Revierte el cambio visual
        })
        .finally(() => {
          this._isProcessingLike = false;
        });
    } else {
      this._isProcessingLike = false;
    }
  };

  _updateLikeUI() {
    this._likeButton?.classList.toggle('heart-icon_active', this._isLiked);
    
    if (this._likeCountElement) {
      this._likeCountElement.textContent = this._likes.length;
    }
  }

  _toggleLike() {
    this._isLiked = !this._isLiked;
    this._updateLikeUI();
    
    if (this._isLiked && this._likeButton) {
      this._likeButton.classList.add('heart-icon_animate');
      setTimeout(() => {
        this._likeButton.classList.remove('heart-icon_animate');
      }, 300);
    }
  }

  _setEventListeners() {
    const trashButton = this._cardElement.querySelector('.trash-button');
    if (trashButton && typeof this._handleDeleteClick === 'function') {
      trashButton.addEventListener('click', () => this._handleDeleteClick(this._id));
    }

    this._likeButton = this._cardElement.querySelector('.heart-icon');
    if (this._likeButton) {
      this._likeButton.removeEventListener('click', this._handleLikeButton); // Limpia listener previo
      this._likeButton.addEventListener('click', this._handleLikeButton);
    }

    this._likeCountElement = this._cardElement.querySelector('.post__like-count');

    const cardImage = this._cardElement.querySelector('.post__picture');
    if (cardImage && typeof this._handleCardClick === 'function') {
      cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }
  }

  createCard() {
    this._cardElement = this._getTemplate();
    if (!this._cardElement) return null;
    
    const cardImage = this._cardElement.querySelector('.post__picture');
    const cardTitle = this._cardElement.querySelector('.post__info-bar-name');
    
    if (cardImage && cardTitle) {
      cardImage.src = this._link;
      cardImage.alt = `Imagen de ${this._name}`;
      cardTitle.textContent = this._name;
    }

    this._cardElement.dataset.cardId = this._id;
    this._isLiked = this._likes.length > 0;
    this._updateLikeUI();
    this._setEventListeners();

    return this._cardElement;
  }
}