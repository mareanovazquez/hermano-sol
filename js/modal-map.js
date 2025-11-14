document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar los elementos que abrirán el modal del mapa
    let direccionJardin = document.querySelector('.contact-method .contact-icon'); // Icono de ubicación
    let contenedorModalMap = document.getElementById('contenedor-modal'); // Reutilizamos el contenedor existente

    // URL del iframe de Google Maps para el Jardín Hermano Sol
    const mapaJardin = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.625359459378!2d-58.478755424524195!3d-34.613633858021515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9e56b8b6c45%3A0x89972c1b0edfafa0!2sComuna%2011%2C%20Condarco%201652%2C%20C1416%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1757520433500!5m2!1ses-419!2sar';

    // Función para desplegar el modal con el mapa
    function desplegarModalMapa() {
        // Crear el contenedor del modal
        let modal = document.createElement('div');
        modal.id = 'modalMapa';
        modal.classList.add('modal');

        // Crear el contenido del modal
        let contenidoModal = document.createElement('div');
        contenidoModal.classList.add('modal-content-wrapper');

        // Crear el título del modal
        let tituloModal = document.createElement('h4');
        tituloModal.textContent = 'Estamos aquí';
        tituloModal.classList.add('modal-map__title');

        // Crear información adicional
        let infoModal = document.createElement('p');
        infoModal.textContent = 'Condarco 1652, Villa Santa Rita, CABA';
        infoModal.classList.add('modal-map__info');

        // Crear el contenedor del mapa
        let mapaContenedor = document.createElement('div');
        mapaContenedor.classList.add('modal-map__container');

        // Crear el iframe para el mapa de Google
        let iframeMapa = document.createElement('iframe');
        iframeMapa.src = mapaJardin;
        iframeMapa.classList.add('modal-map__iframe');
        iframeMapa.setAttribute('allowfullscreen', '');
        iframeMapa.setAttribute('loading', 'lazy');
        iframeMapa.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

        mapaContenedor.appendChild(iframeMapa);

        // Crear el botón de cerrar
        let btnCerrarModal = document.createElement('div');
        btnCerrarModal.classList.add('btn-cerrar');
        btnCerrarModal.id = 'btnCerrarMapa';

        let iconoCerrar = document.createElement('i');
        iconoCerrar.classList.add('fa', 'fa-times');
        btnCerrarModal.appendChild(iconoCerrar);

        // Agregar evento para cerrar el modal
        btnCerrarModal.addEventListener('click', cerrarModalMapa);

        // Ensamblar el modal
        contenidoModal.appendChild(tituloModal);
        contenidoModal.appendChild(infoModal);
        contenidoModal.appendChild(mapaContenedor);
        contenidoModal.appendChild(btnCerrarModal);
        modal.appendChild(contenidoModal);

        // Agregar el modal al contenedor
        contenedorModalMap.appendChild(modal);

        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';

        // Cerrar modal al hacer clic en el fondo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarModalMapa();
            }
        });
    }

    // Función para cerrar el modal
    function cerrarModalMapa() {
        let modal = document.getElementById('modalMapa');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    // Hacer clickeable el icono de ubicación
    if (direccionJardin) {
        direccionJardin.addEventListener('click', function(e) {
            e.preventDefault();
            desplegarModalMapa();
        });
        // Agregar cursor pointer para indicar que es clickeable
        direccionJardin.style.cursor = 'pointer';
        // Agregar efecto hover
        direccionJardin.style.transition = 'transform 0.2s ease';
        direccionJardin.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        direccionJardin.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Hacer clickeable también la dirección de texto (opcional)
    let direccionTexto = document.querySelector('.contact-method address');
    if (direccionTexto) {
        direccionTexto.addEventListener('click', function(e) {
            e.preventDefault();
            desplegarModalMapa();
        });
        direccionTexto.style.cursor = 'pointer';
        direccionTexto.style.transition = 'color 0.2s ease';
        direccionTexto.addEventListener('mouseenter', function() {
            this.style.color = 'var(--color-action-orange)';
        });
        direccionTexto.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    }

    // Cerrar modal con la tecla Escape
    document.addEventListener("keydown", function (event) {
        let modal = document.getElementById('modalMapa');
        if (event.key === 'Escape' && modal) {
            cerrarModalMapa();
        }
    });
});