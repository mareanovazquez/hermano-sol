// modal-salas.js - Modal simplificado solo para imágenes de salas

let imgSalas = document.querySelectorAll('.modal-salas');
let contenedorModalSalas = document.getElementById('contenedor-modal'); // ⚠️ ERA modal-contenedor

function desplegarModalSala() {
    let rutaImagen = this.getAttribute('src');
    let altImagen = this.getAttribute('alt');

    // Crear estructura del modal
    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'modal');

    let modalContentWrapper = document.createElement('div');
    modalContentWrapper.setAttribute('class', 'modal-content-wrapper'); 

    let imagenModal = document.createElement('img');
    imagenModal.setAttribute('src', rutaImagen);
    imagenModal.setAttribute('alt', altImagen);

    // Crear botón cerrar
    let btnModalCerrar = document.createElement('div');
    btnModalCerrar.setAttribute('class', 'btn-cerrar');
    btnModalCerrar.setAttribute('id', 'btnCerrar');
    btnModalCerrar.addEventListener('click', cerrarModal);     

    let xCerrar = document.createElement('i');
    xCerrar.setAttribute('class', 'fa fa-times');
    btnModalCerrar.appendChild(xCerrar);

    // Ensamblar modal
    modalContentWrapper.appendChild(imagenModal);    
    modal.appendChild(modalContentWrapper);
    modal.appendChild(btnModalCerrar); // ⚠️ El botón va en modal, no en wrapper
    contenedorModalSalas.appendChild(modal);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Cerrar modal al hacer clic en el fondo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

function cerrarModal() {
    let modal = document.getElementById('modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para las imágenes
    imgSalas.forEach(img => {
        img.addEventListener('click', desplegarModalSala);
    }); 

    // Event listener para tecla Escape
    document.addEventListener("keydown", function(event) {
        let modal = document.getElementById('modal');
        if (modal && event.key === "Escape") {
            cerrarModal();
        }
    });
}); // ⚠️ FALTABA CERRAR ESTA LLAVE