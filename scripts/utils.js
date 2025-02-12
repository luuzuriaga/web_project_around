// Abrir un modal
export function openModal(element) {
  document.body.append(element); // Agregar modal al DOM
  element.classList.add("modal-open"); // Clase opcional para estilos
}

// Cerrar un modal
export function closeModal(modal) {
  if (modal) {
    modal.remove(); // Eliminar modal del DOM
  }
}

// Controlador global para cerrar modales con Escape
function handleEscapeClose(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal");
    if (modal) closeModal(modal); // Solo cerrar si hay un modal abierto
  }
}

// Controlador global para cerrar modales con clics
function handleClickClose(event) {
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("close-icon")
  ) {
    const modal = event.target.closest(".modal");
    if (modal) closeModal(modal); // Cerrar el modal específico
  }
}

// Registrar eventos globales (estos NO deben interferir con la apertura)
export function enableModalEventListeners() {
  document.addEventListener("keydown", handleEscapeClose);
  document.addEventListener("click", handleClickClose);
}

// Eliminar eventos globales
export function disableModalEventListeners() {
  document.removeEventListener("keydown", handleEscapeClose);
  document.removeEventListener("click", handleClickClose);
}
