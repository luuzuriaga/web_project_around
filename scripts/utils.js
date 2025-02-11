export function openModal(element) {
  document.body.append(element);
}

export function closeModal(event) {
  if (
    event.key === "Escape" ||
    event.target.classList.contains("modal") ||
    event.target.classList.contains("close-icon")
  ) {
    event.target.closest(".modal").remove();
  }
}

document.addEventListener("keydown", closeModal);
document.addEventListener("click", closeModal);
