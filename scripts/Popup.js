//Popup.js
export class Popup {
  constructor(popupSelectorOrElement) {
    this._popup =
      typeof popupSelectorOrElement === "string"
        ? document.querySelector(popupSelectorOrElement)
        : popupSelectorOrElement;

    if (!this._popup) {
      throw new Error(
        `Elemento no encontrado para el selector: ${popupSelectorOrElement}`
      );
    }

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("modal--active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal--active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

setEventListeners() {
  // Cerrar al hacer click en el fondo oscuro (modal)
  this._popup.addEventListener('mousedown', (event) => {
    if (event.target === this._popup) {
      this.close();
    }
  });

  // Cerrar al hacer click en el ícono de cerrar o su contenedor
  const closeElements = [
    ...this._popup.querySelectorAll('.close-icon, .modal__close-box')
  ];
  
  closeElements.forEach(element => {
    element.addEventListener('click', (event) => {
      event.stopPropagation(); // Evita que el evento llegue al modal
      this.close();
    });
  });
<<<<<<< HEAD
=======
}
>>>>>>> b58197688bde22c165b0f27c4e44338deba9b1d1
}
}