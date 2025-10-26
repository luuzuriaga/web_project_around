# Alrededor de EEUU

## 📋 Descripción del proyecto

**Alrededor de EEUU** es una aplicación web interactiva que permite a los usuarios compartir y explorar fotografías de lugares emblemáticos de Estados Unidos. Los usuarios pueden gestionar su perfil personal, publicar nuevas tarjetas con imágenes, dar "me gusta" a publicaciones y eliminar sus propias tarjetas.

## ✨ Funcionalidades principales

- **Gestión de perfil**: Editar nombre, descripción y foto de avatar del usuario
- **Galería de tarjetas**: Visualizar una colección de fotografías de diferentes lugares
- **Crear tarjetas**: Agregar nuevas publicaciones con título e imagen
- **Interacción social**: Dar o quitar "me gusta" a las tarjetas
- **Eliminar tarjetas**: Remover publicaciones propias con confirmación
- **Vista ampliada**: Ver imágenes en tamaño completo mediante un popup
- **Validación de formularios**: Validación en tiempo real de los campos de entrada
- **Diseño responsivo**: Adaptación perfecta a diferentes tamaños de pantalla

## 🛠️ Tecnologías y técnicas utilizadas

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

- **HTML5**: Estructura semántica del sitio web
- **CSS3**: Diseño visual moderno con animaciones y transiciones suaves
  - Flexbox y CSS Grid para layouts responsivos
  - Metodología **BEM** para organización y nomenclatura del código
- **JavaScript (ES6+)**: Programación orientada a objetos
  - Clases para componentes reutilizables
  - Módulos ES6 para organización del código
  - Manipulación del DOM
  - Manejo de eventos y validación de formularios

### Arquitectura
- **Programación Orientada a Objetos**:
  - `Card`: Componente para renderizar tarjetas
  - `FormValidator`: Validación de formularios
  - `Popup`: Base para popups modales
  - `PopupWithForm`: Popups con formularios
  - `PopupWithImage`: Popup para vista ampliada de imágenes
  - `PopupWithConfirmation`: Confirmación de acciones
  - `Section`: Renderizado de listas de elementos
  - `UserInfo`: Gestión de información del usuario
  - `Api`: Comunicación con el servidor

### Herramientas de desarrollo
- **npm**: Gestión de paquetes y scripts
- **Webpack**: Empaquetado y optimización de recursos

## 📁 Estructura del proyecto
```
web_project_around/
├── blocks/          # Estilos CSS organizados por componentes
├── images/          # Recursos gráficos e iconografías
├── pages/           # Estilos principales de la página
├── scripts/         # Clases JavaScript (componentes)
├── src/             # Código fuente HTML
├── vendor/          # Librerías externas y fuentes
└── package.json     # Configuración del proyecto
```

## 🚀 Instalación y uso

1. **Clonar el repositorio**:
```bash
git clone https://github.com/luuzuriaga/web_project_around.git
cd web_project_around
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Ejecutar en desarrollo**:
```bash
npm start
```

4. **Construir para producción**:
```bash
npm run build
```

## 🌐 Demo en vivo

[Visitar la página](https://luuzuriaga.github.io/web_project_around/)

## 👨‍💻 Autor

**Lucero Uzuriaga**
- GitHub: [@luuzuriaga](https://github.com/luuzuriaga)

## 📝 Notas de desarrollo

Este proyecto fue desarrollado como parte del bootcamp de **TripleTen**, aplicando las mejores prácticas de desarrollo web moderno y arquitectura de código escalable.

---

💡 *Proyecto en desarrollo activo - nuevas funcionalidades próximamente*