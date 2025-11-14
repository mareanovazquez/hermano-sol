// smooth-scroll.js - Jardín Hermano Sol
// Enfoque híbrido: CSS como base + JS como fallback y mejora

// 1. Aplicar CSS scroll-behavior como base
document.documentElement.style.scrollBehavior = 'smooth';

// 2. Detectar si el navegador soporta scroll-behavior
const supportsNativeScrollBehavior = 'scrollBehavior' in document.documentElement.style;

// 3. Solo aplicar JavaScript si es necesario o para mejorar la funcionalidad
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (!target) return; // Si no existe el target, no hacer nada
        
        e.preventDefault();
        
        // Si el navegador soporta scroll-behavior nativo, usar scrollIntoView con opciones
        // Si no, usar scrollIntoView como fallback
        target.scrollIntoView({
            behavior: supportsNativeScrollBehavior ? 'smooth' : 'auto',
            block: 'start',
            inline: 'nearest'
        });
        
        // Opcional: Actualizar URL sin trigger de scroll
        // history.pushState(null, null, targetId);
        
        // Opcional: Analytics o tracking
        // console.log(`Navegando a sección: ${targetId}`);
    });
});

// Opcional: Manejar navegación con teclado (Enter/Space en enlaces)
document.addEventListener('keydown', function(e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('a[href^="#"]')) {
        e.target.click();
    }
});