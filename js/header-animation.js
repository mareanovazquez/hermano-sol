// Header scroll behavior 
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollThreshold = 200;
    
    if (scrollY > scrollThreshold) {
        // Mostrar header con slideDown
        header.classList.remove('header--slide-up');
        header.classList.add('header--scrolled');
    } else {
        // Ocultar header con slideUp
        if (header.classList.contains('header--scrolled')) {
            header.classList.add('header--slide-up');
            
            // Remover las clases después de la animación
            setTimeout(() => {
                header.classList.remove('header--scrolled', 'header--slide-up');
            }, 300); // Duración de var(--transition-slow)
        }
    }
    
});