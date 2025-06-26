
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
      this._likeButton.classList.add('heart-icon_animate');
      setTimeout(() => {
        this._likeButton.classList.remove('heart-icon_animate');
      }, 300);
    }
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
}