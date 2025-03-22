export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("modal-open");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("modal-open");
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
