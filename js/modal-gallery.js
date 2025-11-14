// gallery-modal.js - Jardín Hermano Sol - Galería de Imágenes con Navegación

// Variables globales
let galeriaImagenes = document.querySelectorAll('.gallery-img');
let contenedorModal = document.getElementById('contenedor-modal');
let indiceActual = 0;

// Función para abrir modal con imagen específica
function abrirGaleriaModal(indice) {
    indiceActual = indice;
    crearModal();
}

// Función para crear el modal
function crearModal() {
    const imagenActual = galeriaImagenes[indiceActual];
    const rutaImagen = imagenActual.getAttribute('src');
    const altImagen = imagenActual.getAttribute('alt');

    // Crear estructura del modal
    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal-gallery');
    modal.setAttribute('id', 'modal-galeria');

    let modalContentWrapper = document.createElement('div');
    modalContentWrapper.setAttribute('class', 'modal-content-wrapper-gallery');

    // Imagen
    let imagenModal = document.createElement('img');
    imagenModal.setAttribute('src', rutaImagen);
    imagenModal.setAttribute('alt', altImagen);
    imagenModal.setAttribute('class', 'modal-gallery-image');

    // Contador de imágenes
    let contadorModal = document.createElement('div');
    contadorModal.setAttribute('class', 'modal-contador');
    contadorModal.textContent = `${indiceActual + 1} / ${galeriaImagenes.length}`;

    // Botón cerrar
    let btnModalCerrar = document.createElement('div');
    btnModalCerrar.setAttribute('class', 'btn-cerrar');
    btnModalCerrar.setAttribute('id', 'btnCerrarGaleria');
    btnModalCerrar.addEventListener('click', cerrarModal);

    let xCerrar = document.createElement('i');
    xCerrar.setAttribute('class', 'fa fa-times');
    btnModalCerrar.appendChild(xCerrar);

    // Flecha izquierda
    let flechaIzquierda = document.createElement('button');
    flechaIzquierda.setAttribute('class', 'flecha-galeria flecha-izquierda');
    flechaIzquierda.setAttribute('aria-label', 'Imagen anterior');
    const iconoIzquierda = document.createElement('i');
    iconoIzquierda.setAttribute('class', 'fa-solid fa-chevron-left');
    iconoIzquierda.setAttribute('aria-hidden', 'true');
    flechaIzquierda.appendChild(iconoIzquierda);
    flechaIzquierda.addEventListener('click', () => navegarImagen(-1));

    // Flecha derecha
    let flechaDerecha = document.createElement('button');
    flechaDerecha.setAttribute('class', 'flecha-galeria flecha-derecha');
    flechaDerecha.setAttribute('aria-label', 'Imagen siguiente');
    const iconoDerecha = document.createElement('i');
    iconoDerecha.setAttribute('class', 'fa-solid fa-chevron-right');
    iconoDerecha.setAttribute('aria-hidden', 'true');
    flechaDerecha.appendChild(iconoDerecha);
    flechaDerecha.addEventListener('click', () => navegarImagen(1));

    // Ensamblar modal
    modalContentWrapper.appendChild(imagenModal);
    modalContentWrapper.appendChild(contadorModal);

    modal.appendChild(modalContentWrapper);
    modal.appendChild(btnModalCerrar);
    modal.appendChild(flechaIzquierda);
    modal.appendChild(flechaDerecha);

    contenedorModal.appendChild(modal);

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';

    // Cerrar modal al hacer clic en el fondo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

function actualizarModal() {
    const modal = document.getElementById('modal-galeria');
    if (!modal) return;

    const imagenActual = galeriaImagenes[indiceActual];
    const rutaImagen = imagenActual.getAttribute('src');
    const altImagen = imagenActual.getAttribute('alt');

    const imagenModal = modal.querySelector('.modal-gallery-image');

    // Fade out
    imagenModal.style.opacity = '0';

    // Esperar a que termine el fade out, luego cambiar imagen

    imagenModal.setAttribute('src', rutaImagen);
    imagenModal.setAttribute('alt', altImagen);
    imagenModal.style.opacity = '1'; // Fade in


    // Actualizar texto (no necesita esperar)
    const contadorModal = modal.querySelector('.modal-contador');
    contadorModal.textContent = `${indiceActual + 1} / ${galeriaImagenes.length}`;
}

// Función para navegar entre imágenes
function navegarImagen(direccion) {
    // Calcular nuevo índice con wrap-around
    indiceActual = (indiceActual + direccion + galeriaImagenes.length) % galeriaImagenes.length;
    actualizarModal();
}

// Función para cerrar modal
function cerrarModal() {
    let modal = document.getElementById('modal-galeria');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Event listeners para las imágenes
    galeriaImagenes.forEach((imagen, index) => {
        imagen.addEventListener('click', () => abrirGaleriaModal(index));

        // Hacer las imágenes accesibles por teclado
        imagen.setAttribute('tabindex', '0');
        imagen.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                abrirGaleriaModal(index);
            }
        });
    });

    // Event listeners para teclado
    document.addEventListener('keydown', (event) => {
        let modal = document.getElementById('modal-galeria');

        if (!modal) return;

        switch (event.key) {
            case 'Escape':
                cerrarModal();
                break;
            case 'ArrowLeft':
                navegarImagen(-1);
                break;
            case 'ArrowRight':
                navegarImagen(1);
                break;
        }
    });
});