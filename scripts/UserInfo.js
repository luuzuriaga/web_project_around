//UserInfo.js
export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = null;
    this._defaultAvatar = './images/default-avatar.jpg';
    this._loadingImage = './images/loading.gif';
  }

  getUserInfo() {
    return {
      name: this._nameElement?.textContent || '',
      about: this._aboutElement?.textContent || '',
      avatar: this._avatarElement?.src || '',
      _id: this._userId || ''
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
    if (avatar) this.setUserAvatar(avatar);
    if (_id) this._userId = _id;
  }

  setUserAvatar(avatarUrl) {
    if (!this._avatarElement) return;

    this._showLoadingState();
    this._loadAvatarWithFallbacks(avatarUrl);
  }

  _showLoadingState() {
    this._avatarElement.src = this._loadingImage;
    this._avatarElement.alt = 'Cargando avatar...';
  }

  _loadAvatarWithFallbacks(url) {
    // Primero intentar con proxy CORS
    const corsProxy = 'https://corsproxy.io/?';
    const proxiedUrl = `${corsProxy}${encodeURIComponent(url)}`;
    
    const testImage = new Image();
    testImage.crossOrigin = 'Anonymous';
    
    testImage.onload = () => {
      this._setFinalAvatar(url);
    };
    
    testImage.onerror = () => {
      console.warn('Falló proxy CORS, intentando carga directa');
      this._setFinalAvatar(url, true);
    };
    
    testImage.src = proxiedUrl;
  }

  _setFinalAvatar(url, useDirect = false) {
    const finalUrl = useDirect ? url : `${url}?timestamp=${Date.now()}`;
    this._avatarElement.src = finalUrl;
    this._avatarElement.alt = `Avatar de ${this._nameElement?.textContent || 'usuario'}`;
    
    this._avatarElement.onerror = () => {
      console.warn('Error carga final, usando imagen por defecto');
      this._avatarElement.src = this._defaultAvatar;
    };
  }

  getUserId() {
    return this._userId;
  }
}
