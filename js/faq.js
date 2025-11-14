// faq.js - Jardín Hermano Sol - Preguntas Frecuentes

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ACORDEÓN =====
    const faqItems = document.querySelectorAll('[data-faq-item]');
    
    faqItems.forEach(item => {
        const question = item.querySelector('[data-faq-question]');
        
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
        });
    });

    // ===== FILTRO DE BÚSQUEDA =====
    const searchInput = document.getElementById('faq-search-input');
    const faqList = document.getElementById('faq-list');
    const noResults = document.getElementById('faq-no-results');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let visibleCount = 0;
        
        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question__text').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer__content').textContent.toLowerCase();
            
            // Buscar tanto en la pregunta como en la respuesta
            const matchFound = questionText.includes(searchTerm) || answerText.includes(searchTerm);
            
            if (matchFound || searchTerm === '') {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
                // Si está abierta, cerrarla cuando se oculta
                item.classList.remove('active');
            }
        });
        
        // Mostrar mensaje de "no results" si no hay coincidencias
        if (visibleCount === 0 && searchTerm !== '') {
            noResults.style.display = 'block';
            faqList.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            faqList.style.display = 'block';
        }
    });
    
});