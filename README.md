# Jardín Modelo Hermano Sol

Sitio web informativo y estático del Jardín Modelo Hermano Sol (educación inicial).

## Descripción

Proyecto front-end estático y responsive que presenta la propuesta pedagógica, las salas, la galería multimedia y vías de contacto. El sitio incluye modales para imágenes y video, un formulario de contacto y animaciones basadas en scroll.

## Funcionalidades principales

- Menú de navegación y menú móvil
- Secciones: Hero, Salas, Espacios, Propuesta pedagógica, Actividades, Contacto
- Galería con modal de imágenes
- Modal de video
- Modal con mapa de ubicación
- Animaciones al hacer scroll
- Botón "volver arriba"
- Formulario de contacto con envío y mensajes tipo toast

## Páginas

- `index.html` — Página principal
- `pages/galeria.html` — Galería del sitio
- `pages/preguntas-frecuentes.html` — FAQ

## Estructura del proyecto
```
jardin-hermano-sol/
├── README.md
├── firebase.json                 # (presente) posible configuración para Firebase Hosting
├── index.html
├── pages/
│   ├── galeria.html
│   └── preguntas-frecuentes.html
├── css/
│   ├── components.css
│   ├── faq.css
│   ├── gallery.css
│   ├── modal-video.css
│   ├── scroll-animations.css
│   ├── style.css
│   └── variables.css
├── js/
│   ├── backToTop.js
│   ├── config.js
│   ├── contact-form.js
│   ├── faq.js
│   ├── header-animation.js
│   ├── mobile-menu.js
│   ├── modal-gallery.js
│   ├── modal-images.js
│   ├── modal-map.js
│   ├── modal-salas.js
│   ├── modal-video.js
│   ├── scroll-animations.js
│   ├── smooth-scroll.js
│   └── toast-message.js
├── img/
│   └── galeria/                   # carpeta con imágenes de la galería
└── videos/                         # carpeta para archivos de video
```

### Notas sobre carpetas y archivos

- La carpeta `css/` contiene hojas de estilo modulares (componentes, FAQ, galerías y animaciones).
- La carpeta `js/` agrupa los scripts de interacción: navegación móvil, modales, formularios y animaciones.
- `firebase.json` está presente si quieres desplegar en Firebase Hosting (revisar configuración antes de `firebase deploy`).

## Cómo ver el sitio localmente

1. Abrí `index.html` en tu navegador (sitio estático).
2. Para servirlo localmente con un servidor sencillo (recomendado para pruebas):

   - Con Python 3:
```bash
     python -m http.server 8000
```

   - Con Live Server (VS Code): instalar la extensión Live Server y seleccionar "Open with Live Server".

3. Si usás Firebase Hosting, revisá `firebase.json` y luego:
```bash
   firebase deploy --only hosting
```

## Desarrollo y mantenimiento

- Las hojas de estilo están separadas por responsabilidad para facilitar mantenimiento.
- Los scripts están organizados por funcionalidad; si agregás features, ubicá el JS correspondiente en `js/`.

## Autor

Mariano Vazquez

