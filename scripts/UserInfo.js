//UserInfo.js
export class UserInfo {
  constructor({ nameSelector, professionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(professionSelector);
    // Selecciona el avatar usando la estructura existente
    this._avatarElement = document.querySelector('.profile__avatar-wrapper .profile__avatar');
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent
    };
    
    // Añade el avatar solo si existe el elemento
    if (this._avatarElement) {
      userInfo.avatar = this._avatarElement.src;
    }
    
    return userInfo;
  }

  setUserInfo({ name, profession, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (profession) this._professionElement.textContent = profession;
    if (avatar) this.setUserAvatar(avatar);
  }

  setUserAvatar(avatarUrl) {
    if (this._avatarElement) {
      // Crea una imagen temporal para validar antes de asignar
      const testImage = new Image();
      testImage.onload = () => {
        this._avatarElement.src = avatarUrl;
      };
      testImage.src = avatarUrl;
    }
  }
}