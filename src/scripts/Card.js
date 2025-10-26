
//Card.js
export class Card {
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
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._likes = Array.isArray(likes) ? likes : [];
    this._ownerId = owner?._id || owner;
    this._currentUserId = currentUserId;
    this._isLiked = this._checkIfLiked();
    this._element = null;
  }

  _checkIfLiked() {
    return this._likes.some(like => {
      const likeId = like._id || like.id || like;
      return likeId === this._currentUserId;
    });
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
    
    // Actualización optimista
    this._isLiked = !this._isLiked;
    this._updateLikesView();
    
    this._handleLikeClick(this._id, originalState.isLiked)
      .then(updatedCard => {
        // La API devuelve el estado isLiked directamente
        this._isLiked = updatedCard.isLiked;
        
        // Actualizamos los likes basados en el nuevo estado
        if (this._isLiked) {
          // Añadir like si no existe
          if (!this._likes.some(like => (like._id || like) === this._currentUserId)) {
            this._likes.push(this._currentUserId);
          }
        } else {
          // Quitar like si existe
          this._likes = this._likes.filter(like => (like._id || like) !== this._currentUserId);
        }
        
        this._updateLikesView();
      })
      .catch(err => {
        console.error('Error al actualizar like:', err);
        
        // Rollback al estado original
        this._isLiked = originalState.isLiked;
        this._likes = originalState.likes;
        this._updateLikesView();
        
        this._showErrorFeedback('No se pudo actualizar el like. Intenta nuevamente.');
      });
  }

  _showErrorFeedback(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'card-error-feedback';
    errorElement.textContent = message;
    
    if (this._likeButton) {
      const likeContainer = this._likeButton.closest('.post__like-container');
      if (likeContainer) {
        likeContainer.appendChild(errorElement);
        
        setTimeout(() => {
          errorElement.remove();
        }, 3000);
      }
    }
  }

  _updateLikesView() {
    if (!this._likeCount || !this._likeButton) return;
    
    // Actualizar contador de likes
    this._likeCount.textContent = this._likes.length;
    
    // Actualizar estado visual del corazón
    if (this._isLiked) {
      this._likeButton.classList.add('heart-icon_active');
      this._likeButton.classList.add('heart-icon_animate');
      setTimeout(() => {
        this._likeButton.classList.remove('heart-icon_animate');
      }, 300);
    } else {
      this._likeButton.classList.remove('heart-icon_active');
    }
  }

  createCard() {
    this._element = this._getTemplate();
    if (!this._element) return null;

    // Seleccionar elementos
    this._cardImage = this._element.querySelector('.post__picture');
    this._likeButton = this._element.querySelector('.heart-icon');
    this._likeCount = this._element.querySelector('.post__like-count');
    this._deleteButton = this._element.querySelector('.trash-button');

    // Configurar imagen
    if (this._cardImage) {
      this._cardImage.src = this._link;
      this._cardImage.alt = `Imagen de ${this._name}`;
      this._cardImage.onerror = () => {
        this._cardImage.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
      };
    }

    // Configurar título
    const titleElement = this._element.querySelector('.post__info-bar-name');
    if (titleElement) {
      titleElement.textContent = this._name;
    }

    // Configurar ID de la tarjeta
    if (this._element) {
      this._element.dataset.cardId = this._id;
    }

    // Configurar botón de eliminar
    if (this._deleteButton) {
      this._deleteButton.style.display = this._ownerId === this._currentUserId ? 'block' : 'none';
    }

    // Actualizar vista inicial
    this._updateLikesView();
    this._setEventListeners();

    return this._element;
  }

  remove() {
    this._element?.remove();
    this._element = null;
  }
}