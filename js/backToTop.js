document.addEventListener('DOMContentLoaded', function () {
    const btnBackToTop = document.getElementById('btnBackToTop');
    const SHOW_THRESHOLD = 300; // Altura para mostrar
    const HIDE_THRESHOLD = SHOW_THRESHOLD / 2; // Altura para ocultar
    
    let isVisible = false; // Evitar cambios innecesarios
    
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        
        if (scrollY >= SHOW_THRESHOLD && !isVisible) {
            btnBackToTop.style.marginLeft = '0px';
            isVisible = true;
        } else if (scrollY <= HIDE_THRESHOLD && isVisible) {
            btnBackToTop.style.marginLeft = '-60px';
            isVisible = false;
        }
    });
});