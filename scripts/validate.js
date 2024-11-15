// validate.js

// Validar si el campo de texto está vacío
function isFieldEmpty(fieldValue) {
  return fieldValue.trim() === "";
}

// Validar URL de la imagen (debemos asegurarnos de que es una URL válida de una imagen)
function isValidImageUrl(url) {
  const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
  return imageRegex.test(url);
}

// Validar nombre (mínimo 3 caracteres, no vacío)
function isValidName(name) {
  return name.length >= 3;
}

// Validar descripción (mínimo 5 caracteres, no vacío)
function isValidDescription(description) {
  return description.length >= 5;
}

// Función principal de validación para el formulario de agregar imagen
function validateAddImageForm(name, url) {
  if (isFieldEmpty(name)) {
    alert("El campo 'Nombre' no puede estar vacío.");
    return false;
  }

  if (!isValidName(name)) {
    alert("El 'Nombre' debe tener al menos 3 caracteres.");
    return false;
  }

  if (isFieldEmpty(url)) {
    alert("El campo 'URL de la imagen' no puede estar vacío.");
    return false;
  }

  if (!isValidImageUrl(url)) {
    alert(
      "Por favor, ingresa una URL de imagen válida (por ejemplo, .jpg, .png)."
    );
    return false;
  }

  return true;
}

// Función de validación para el formulario de perfil
function validateProfileForm(name, description) {
  if (isFieldEmpty(name)) {
    alert("El campo 'Nombre' no puede estar vacío.");
    return false;
  }

  if (!isValidName(name)) {
    alert("El 'Nombre' debe tener al menos 3 caracteres.");
    return false;
  }

  if (isFieldEmpty(description)) {
    alert("El campo 'Descripción' no puede estar vacío.");
    return false;
  }

  if (!isValidDescription(description)) {
    alert("La 'Descripción' debe tener al menos 5 caracteres.");
    return false;
  }

  return true;
}

export { validateAddImageForm, validateProfileForm };
