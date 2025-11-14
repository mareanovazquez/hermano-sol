// scroll-animations.js - Jardín Hermano Sol
// Script centralizado para todas las animaciones de entrada al viewport

document.addEventListener('DOMContentLoaded', function () {

    // CONFIGURACIÓN BASE para Jardín Hermano Sol. Valores por defecto de animación.
    const CONFIG = {
        selector: '.animate-on-scroll',
        visibleClass: 'visible',
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',

    };

    // Función principal de animación
    function initializeScrollAnimation(customConfig = {}) {
        const config = { ...CONFIG, ...customConfig };
        const elementsToAnimate = document.querySelectorAll(config.selector);

        if (elementsToAnimate.length === 0) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(config.visibleClass);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: config.threshold,
            rootMargin: config.rootMargin
        });

        elementsToAnimate.forEach(elemento => {
            observer.observe(elemento);
        });

        function checkInitiallyVisible() {
            elementsToAnimate.forEach(elemento => {
                if (isInViewport(elemento)) {
                    elemento.classList.add(config.visibleClass);
                    observer.unobserve(elemento);
                }
            });
        }
        checkInitiallyVisible();

        // Fallback para navegadores sin IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            observer.disconnect();

            function handleScroll() {
                elementsToAnimate.forEach(elemento => {
                    if (isInViewport(elemento) && !elemento.classList.contains(config.visibleClass)) {
                        elemento.classList.add(config.visibleClass);
                    }
                });
            }
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        }
        return observer;
    }
    function isInViewport(elemento) {
        const rect = elemento.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // =================================================================
    // ANIMACIONES ESPECÍFICAS PARA JARDÍN HERMANO SOL
    // =================================================================

    //  Animación genérica para elementos marcados manualmente
    initializeScrollAnimation({
        selector: '.animate-on-scroll',
        visibleClass: 'visible',
        threshold: 0.2
    });

  //  Cards de espacios del jardín
    initializeScrollAnimation({
        selector: '.space-card',
        visibleClass: 'space-visible',
        threshold: 0.3
    });

    // Cards de áreas pedagógicas
    initializeScrollAnimation({
        selector: '.pedagogical-area',
        visibleClass: 'pedagogy-visible',
        threshold: 0.25,
        
    });

    // Timeline items
    initializeScrollAnimation({
        selector: '.timeline-item',
        visibleClass: 'timeline-visible',
        threshold: 0.3,
        rootMargin: '0px 0px -40px 0px'
    });
    
    // Grid de actividades
    initializeScrollAnimation({
        selector: '.activity-item',
        visibleClass: 'activity-visible',
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    });

       //  Contact methods
    initializeScrollAnimation({
        selector: '.contact-method',
        visibleClass: 'contact-visible',
        threshold: 0.25
    });

    // Form container
    initializeScrollAnimation({
        selector: '.contact-form-container',
        visibleClass: 'form-visible',
        threshold: 0.2
    });

    //  Section headers (títulos de sección)
    initializeScrollAnimation({
        selector: '.section__header',
        visibleClass: 'header-visible',
        threshold: 0.4,
        rootMargin: '0px 0px -50px 0px'
    });


});

