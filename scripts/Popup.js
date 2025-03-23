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
    this._popup.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("modal") ||
        event.target.classList.contains("close-icon")
      ) {
        this.close();
      }
    });
  }
}
