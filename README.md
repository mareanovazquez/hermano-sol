# Jardín Modelo Hermano Sol

Sitio web oficial del Jardín Modelo Hermano Sol, una institución educativa con 40 años de experiencia en educación inicial, ubicada en Villa Santa Rita, Buenos Aires.

## Descripción del Proyecto

Este proyecto es un sitio web responsive para el Jardín Modelo Hermano Sol, diseñado para mostrar la propuesta pedagógica, instalaciones, actividades y facilitar el contacto con las familias interesadas.

## Características Principales

- **Diseño Responsive**: Adaptable a dispositivos móviles, tablets y escritorio
- **Navegación Intuitiva**: Menú de navegación claro y accesible
- **Secciones Informativas**: Presentación de salas, espacios, propuesta pedagógica y actividades
- **Preguntas Frecuentes (FAQ)**: Página dedicada con acordeón interactivo
- **Formulario de Contacto**: Para consultas e inscripciones, con mensajes tipo toast
- **Galería de Imágenes**: Con visualización modal para mostrar los espacios del jardín
- **Animaciones de Scroll**: Mejoran la experiencia durante el recorrido del sitio
- **Mapa de Ubicación en Modal**: Apertura de mapa en ventana modal (Google Maps)
- **Botón Volver Arriba**: Acceso rápido al inicio de la página

## Tecnologías Utilizadas

- HTML5
- CSS3 (con arquitectura modular)
- JavaScript Vanilla
- Font Awesome (para iconografía)
- Google Fonts

## Estructura del Proyecto

```
jardin-hermano-sol/
├── README.md
├── index.html
├── pages/
│   └── preguntas-frecuentes.html
├── css/
│   ├── components.css              # Estilos de componentes reutilizables
│   ├── faq.css                     # Estilos específicos para la página de FAQ
│   ├── scroll-animations.css       # Animaciones basadas en scroll
│   ├── style.css                   # Estilos globales y layout principal
│   └── variables.css               # Variables de color, tipografía y espaciado
├── js/
│   ├── backToTop.js                # Lógica del botón "Volver arriba"
│   ├── config.js                   # Configuración global del sitio
│   ├── contact-form.js             # Manejo del formulario de contacto y toasts
│   ├── faq.js                      # Interacciones de la página de preguntas frecuentes
│   ├── header-animation.js         # Animaciones y comportamiento del header
│   ├── mobile-menu.js              # Menú móvil y toggles
│   ├── modal-map.js                # Apertura y cierre del modal con el mapa
│   ├── modal-spaces.js             # Modal para galería de espacios
│   ├── scroll-animations.js        # Inicialización/observadores para animaciones on-scroll
│   ├── smooth-scroll.js            # Desplazamiento suave para anclas
│   └── toast-message.js            # Componente de mensajes toast
└── img/
    ├── biblioteca.JPG
    ├── biblioteca2.jpg
    ├── favicon.png
    ├── frente.png
    ├── frente2.png
    ├── logo-fondo-transparente.png
    ├── logo.png
    ├── patio-cubierto.jpg
    ├── patio-descubierto.jpg
    ├── sala-planta-alta-vertical.JPG
    ├── sala-planta-alta.jpg
    ├── sala-planta-baja-grande.JPG
    ├── sala-planta-baja.jpg
    ├── salas-1-vertical.jpg
    └── sum.jpg
```

### Páginas
- `index.html`: Página principal del sitio.
- `pages/preguntas-frecuentes.html`: Página de preguntas frecuentes con acordeón.

### CSS
- `variables.css`: Paleta de colores, tipografías y spacing.
- `components.css`: Botones, tarjetas, modales y utilidades.
- `style.css`: Layout general, secciones principales y medias queries.
- `faq.css`: Diseño específico de la sección de FAQs.
- `scroll-animations.css`: Clases y keyframes para entradas animadas.

### JavaScript
- `mobile-menu.js`: Apertura/cierre de menú en dispositivos móviles.
- `header-animation.js`: Comportamiento del header al hacer scroll.
- `smooth-scroll.js`: Navegación suave entre secciones.
- `backToTop.js`: Mostrar y manejar el botón de volver arriba.
- `modal-spaces.js`: Galería y modal para visualizar espacios.
- `modal-map.js`: Modal que muestra el mapa de ubicación.
- `faq.js`: Acordeón y lógica de la página de preguntas frecuentes.
- `contact-form.js`: Validación/envío del formulario y notificaciones.
- `toast-message.js`: Sistema de notificaciones tipo toast.
- `config.js`: Valores de configuración reutilizables.

## Secciones del Sitio

1. **Header**: Logo, navegación y botón de inscripción
2. **Hero**: Presentación principal con imagen de fondo
3. **Salas**: Galería de las diferentes salas del jardín
4. **Espacios**: Presentación de los espacios educativos
5. **Propuesta Pedagógica**: Descripción de las áreas pedagógicas
6. **Trayectoria**: Línea de tiempo con hitos importantes
7. **Actividades**: Listado de actividades y horarios
8. **Preguntas Frecuentes (FAQ)**: Respuestas a consultas habituales
9. **Contacto**: Información de contacto y formulario
10. **Footer**: Enlaces adicionales e información legal

## Características de Accesibilidad

- Etiquetas semánticas HTML5
- Atributos ARIA para mejorar la accesibilidad
- Contraste adecuado entre texto y fondo
- Textos alternativos en imágenes

## Optimización

- Imágenes optimizadas para carga rápida
- CSS modular para mejor mantenimiento
- JavaScript no bloqueante

## Cómo usar

- Abrí `index.html` directamente en tu navegador para visualizar el sitio.
- La página de preguntas frecuentes está en `pages/preguntas-frecuentes.html`.

## Desarrollador

Desarrollado por Mariano Vazquez.

## Licencia

Todos los derechos reservados © 2025 Jardín Hermano Sol.