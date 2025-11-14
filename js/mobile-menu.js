// Mobile menu toggle
let isMenuOpen = false;
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.getElementById('nav');

mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que se propague al document
    nav.classList.toggle('nav--open');
    mobileMenuToggle.classList.toggle('mobile-menu-toggle--active');
    isMenuOpen = nav.classList.contains('nav--open'); // Estado real
});

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Función helper para cerrar el menú
function closeMenu() {
    nav.classList.remove('nav--open');
    mobileMenuToggle.classList.remove('mobile-menu-toggle--active');
    isMenuOpen = false;
}

// Close menu on Escape key
document.addEventListener('keydown', function (e) {
    if (isMenuOpen && e.key === 'Escape') {
        closeMenu();
    }
});

// Close menu when clicking outside
document.addEventListener('click', function (e) {
    if (isMenuOpen) {
        // Verificar si el click fue fuera del menú Y del botón toggle
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMenu();
        }
    }
});

// Close menu on touch outside
document.addEventListener('touchstart', function (e) {
    if (isMenuOpen) {
        // Verificar si el touch fue fuera del menú Y del botón toggle  
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMenu();
        }   
    }
});

// Close menu on window resize
window.addEventListener('resize', function () {
    if (isMenuOpen) {
        closeMenu();
    }
});