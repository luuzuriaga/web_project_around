
//Card.js
export class Card {
<<<<<<< HEAD
  constructor({ 
    name, 
    link, 
    _id, 
    likes = [], 
    owner, 
    currentUserId 
  }, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._id = _id;
=======
  constructor({ name, link, _id, likes = [] }, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._id = _id || `card-${Math.random().toString(16).slice(2)}`;
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
<<<<<<< HEAD
    this._likes = Array.isArray(likes) ? likes : [];
    this._ownerId = owner?._id || owner;
    this._currentUserId = currentUserId;
    this._isLiked = this._likes.some(like => like._id === this._currentUserId);
    this._element = null;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    if (!template) {
      console.error(`Template no encontrado: ${this._templateSelector}`);
      return null;
    }
    return template.content.querySelector('.post')?.cloneNode(true);
  }

  _setEventListeners() {
    if (this._likeButton) {
      this._likeButton.addEventListener('click', () => this._handleLike());
    }
    
    if (this._cardImage) {
      this._cardImage.addEventListener('click', () => 
        this._handleCardClick(this._name, this._link));
    }

    if (this._deleteButton) {
      if (this._ownerId === this._currentUserId) {
        this._deleteButton.style.display = 'block';
        this._deleteButton.addEventListener('click', (evt) => {
          evt.stopPropagation();
          this._handleDeleteClick(this._id, this);
        });
      } else {
        this._deleteButton.style.display = 'none';
      }
    }
  }

  _handleLike() {
    if (!this._handleLikeClick) return;
    
    const originalState = {
      isLiked: this._isLiked,
      likes: [...this._likes]
    };
    
    this._isLiked = !this._isLiked;
    this._updateLikesView();
    
    this._handleLikeClick(this._id, originalState.isLiked)
      .then(updatedCard => {
        if (!updatedCard || !Array.isArray(updatedCard.likes)) {
          throw new Error('Respuesta inválida del servidor');
        }
        
        this._likes = updatedCard.likes;
        this._isLiked = this._likes.some(like => like._id === this._currentUserId);
        this._updateLikesView();
      })
      .catch(err => {
        console.error('Error al actualizar like:', err);
        this._isLiked = originalState.isLiked;
        this._likes = originalState.likes;
        this._updateLikesView();
      });
  }

  _updateLikesView() {
    if (!this._likeCount || !this._likeButton) return;
    
    this._likeCount.textContent = this._likes.length;
    
    const wasActive = this._likeButton.classList.contains('heart-icon_active');
    this._likeButton.classList.toggle('heart-icon_active', this._isLiked);
    
    if (this._isLiked && !wasActive) {
=======
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
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1
      this._likeButton.classList.add('heart-icon_animate');
      setTimeout(() => {
        this._likeButton.classList.remove('heart-icon_animate');
      }, 300);
    }
<<<<<<< HEAD
  }

  createCard() {
    this._element = this._getTemplate();
    if (!this._element) return null;

    this._cardImage = this._element.querySelector('.post__picture');
    this._likeButton = this._element.querySelector('.heart-icon');
    this._likeCount = this._element.querySelector('.post__like-count');
    this._deleteButton = this._element.querySelector('.trash-button');

    if (this._cardImage) {
      this._cardImage.src = this._link;
      this._cardImage.alt = `Imagen de ${this._name}`;
    }

    const titleElement = this._element.querySelector('.post__info-bar-name');
    if (titleElement) {
      titleElement.textContent = this._name;
    }

    if (this._element) {
      this._element.dataset.cardId = this._id;
    }

    if (this._deleteButton) {
      this._deleteButton.style.display = this._ownerId === this._currentUserId ? 'block' : 'none';
    }

    this._updateLikesView();
    this._setEventListeners();

    return this._element;
  }

  remove() {
    this._element?.remove();
    this._element = null;
  }
=======
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
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1
}