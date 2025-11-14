// toast.js - Sistema simple de notificaciones
function showToast(message, type, duration = 3000) {
    // Remover toast anterior si existe
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Crear un elemento div para el toast
    const toast = document.createElement('div');
    
    // Asignar clases CSS para el estilo base y el tipo específico de toast
    toast.className = `toast toast--${type}`;
    
    // Establecer el contenido del mensaje (permitir HTML)
    toast.innerHTML = message;
    
    // Agregar el toast al cuerpo del documento
    document.body.appendChild(toast);
    
    // Pequeño retraso para permitir que el elemento se procese
    setTimeout(() => {
        toast.classList.add('toast--show');
    }, 100);
    
    // Esperar duración personalizable antes de ocultar
    setTimeout(() => {
        toast.classList.remove('toast--show');
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, duration);
}