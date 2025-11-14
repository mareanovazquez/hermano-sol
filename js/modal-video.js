// modal-video.js - Modal para video vertical con controles personalizados - CORREGIDO

document.addEventListener('DOMContentLoaded', function() {
    const openVideoBtn = document.getElementById('open-video-modal');
    const contenedorModal = document.getElementById('contenedor-modal');
    const btnBackTotop = document.getElementById('btnBackToTop');
    const btnWhatsapp = document.getElementById('btnWhatsapp');
    
    openVideoBtn.addEventListener('click', abrirModalVideo);
    
    function abrirModalVideo() {

        btnBackTotop.style.display = 'none';
        btnWhatsapp.style.display = 'none';
        // Crear modal
        const modal = document.createElement('div');
        modal.setAttribute('class', 'modal-video');
        modal.setAttribute('id', 'modal-video');
        
        const modalContent = document.createElement('div');
        modalContent.setAttribute('class', 'modal-video-content');
        
        // Crear elemento video
        const video = document.createElement('video');
        video.setAttribute('class', 'modal-video-player');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'auto');
        video.setAttribute('loop', '');
        
        // IMPORTANTE: Establecer muted ANTES de autoplay
        video.muted = true; // 👈 Establecer muted como propiedad, no atributo
        
        // Source del video
        const source = document.createElement('source');
        source.setAttribute('src', './videos/recorrido.mp4'); // 👈 CAMBIA ESTA RUTA
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);
        
        // Contenedor de controles personalizados
        const controls = document.createElement('div');
        controls.setAttribute('class', 'modal-video-controls');
        
        // Botón Play/Pause
        const btnPlayPause = document.createElement('button');
        btnPlayPause.setAttribute('class', 'modal-video-control-btn play-pause-btn');
        btnPlayPause.setAttribute('aria-label', 'Pausar video');
        btnPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
        
        // Botón Mute/Unmute
        const btnMute = document.createElement('button');
        btnMute.setAttribute('class', 'modal-video-control-btn mute-btn');
        btnMute.setAttribute('aria-label', 'Activar sonido');
        btnMute.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        
        // Botón cerrar
        const btnCerrar = document.createElement('button');
        btnCerrar.setAttribute('class', 'modal-video-close');
        btnCerrar.setAttribute('aria-label', 'Cerrar video');
        btnCerrar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        
        // Ensamblar PRIMERO (para que los elementos existan en el DOM)
        modalContent.appendChild(video);
        modalContent.appendChild(controls);
        controls.appendChild(btnPlayPause);
        controls.appendChild(btnMute);
        modal.appendChild(modalContent);
        modal.appendChild(btnCerrar);
        contenedorModal.appendChild(modal);
        
        // DESPUÉS de agregar al DOM, iniciar el video
        // Pequeño delay para asegurar que el DOM está listo
        setTimeout(() => {
            video.play().catch(err => {
                console.log('Autoplay bloqueado:', err);
                // Si el autoplay falla, mostrar botón de play
                btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
                btnPlayPause.classList.add('paused');
            });
        }, 100);
        
        // Event Listeners DESPUÉS de agregar al DOM
        
        // Toggle Play/Pause
        btnPlayPause.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se propague el click
            
            if (video.paused) {
                video.play();
                btnPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
                btnPlayPause.setAttribute('aria-label', 'Pausar video');
                btnPlayPause.classList.remove('paused');
            } else {
                video.pause();
                btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
                btnPlayPause.setAttribute('aria-label', 'Reproducir video');
                btnPlayPause.classList.add('paused');
            }
        });
        
        // Toggle Mute/Unmute
        btnMute.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se propague el click
            
            if (video.muted) {
                video.muted = false;
                btnMute.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                btnMute.setAttribute('aria-label', 'Silenciar');
                btnMute.classList.add('active');
            } else {
                video.muted = true;
                btnMute.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
                btnMute.setAttribute('aria-label', 'Activar sonido');
                btnMute.classList.remove('active');
            }
        });
        
        // Click en video para pausar/play
        video.addEventListener('click', (e) => {
            e.stopPropagation();
            btnPlayPause.click();
        });
        
        // Botón cerrar
        btnCerrar.addEventListener('click', cerrarModalVideo);
        
        // Prevenir scroll
        document.body.style.overflow = 'hidden';

        
        
        // Cerrar al hacer clic en el fondo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarModalVideo();
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', handleEscape);
    }
    
    function cerrarModalVideo() {
        const modal = document.getElementById('modal-video');
        if (modal) {
            const video = modal.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            modal.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
            btnBackTotop.style.display = 'block';
            btnWhatsapp.style.display = 'block';
        }
    }
    
    function handleEscape(e) {
        if (e.key === 'Escape') {
            cerrarModalVideo();
        }
    }
});