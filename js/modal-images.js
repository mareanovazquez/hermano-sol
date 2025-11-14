// modal-spaces.js - Jardín Hermano Sol - Versión Simplificada (sin navegación)

// Variables globales
let imgSpace = document.getElementsByClassName('modal-img');
let contenedorModalSpaces = document.getElementById('contenedor-modal');

// Función para desplegar el modal
function desplegarModal() {
    let rutaImagen = this.getAttribute('src');
    let altImagen = this.getAttribute('alt');
    let tituloImagen = this.getAttribute('data-title') || 'Espacio del jardín';
    let textoImagen = this.getAttribute ('data-description') || "Espacio del jardín";

    // Crear estructura del modal
    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'modal');

    let modalContentWrapper = document.createElement('div');
    modalContentWrapper.setAttribute('class', 'modal-content-wrapper');

    let imagenModal = document.createElement('img');
    imagenModal.setAttribute('src', rutaImagen);
    imagenModal.setAttribute('alt', altImagen);

    let tituloModal = document.createElement('h3');
    tituloModal.textContent = tituloImagen;

    let textoModal = document.createElement('p');
    textoModal.textContent = textoImagen;

    // Crear botón cerrar
    let btnModalCerrar = document.createElement('div');
    btnModalCerrar.setAttribute('class', 'btn-cerrar');
    btnModalCerrar.setAttribute('id', 'btnCerrar');
    btnModalCerrar.addEventListener('click', cerrarModal);

    let xCerrar = document.createElement('i');
    xCerrar.setAttribute('class', 'fa fa-times');
    btnModalCerrar.appendChild(xCerrar);

    // Ensamblar modal (sin flechas ni contador)
    modalContentWrapper.appendChild(imagenModal);
    modalContentWrapper.appendChild(tituloModal);
    modalContentWrapper.appendChild(textoModal);
    modalContentWrapper.appendChild(btnModalCerrar);

    modal.appendChild(modalContentWrapper);
    contenedorModalSpaces.appendChild(modal);

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';

    // Cerrar modal al hacer clic en el fondo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// Función para cerrar modal
function cerrarModal() {
    let modal = document.getElementById('modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para las imágenes
    for (let i = 0; i < imgSpace.length; i++) {
        imgSpace[i].addEventListener('click', desplegarModal);
    }

    // Event listener solo para cerrar con Escape
    document.addEventListener("keydown", (event) => {
        let modal = document.getElementById('modal');
        
        if (modal && event.key === 'Escape') {
            cerrarModal();
        }
    });
});