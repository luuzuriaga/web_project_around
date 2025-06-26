//Api.js
export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}: ${res.statusText}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    }).then(this._checkResponse);
  }

  updateUserAvatar({ avatar }) {
    // Limpiar parámetros de caché
    const cleanAvatar = avatar.split('?')[0];
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: cleanAvatar })
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._headers
    }).then(this._checkResponse);
  }

  loadInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userData, cards]) => {
        if (!userData || !cards) {
          throw new Error('Datos iniciales incompletos');
        }
        return [userData, cards];
      });
  }
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "2ed9e603-1d3c-4110-b430-3875eb467e35",
    'Content-Type': 'application/json'
  }
});
