export function openModal(modal) {
  modal.classList.add("modal_opened");
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

export function openModalWithImage(name, link) {
  const modal = document.querySelector(".modal__card");
  modal.querySelector(".modal__card-image").src = link;
  modal.querySelector(".modal__card-title").textContent = name;
  openModal(modal);
}
