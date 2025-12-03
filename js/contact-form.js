// contact-form.js - Jardín Hermano Sol - Firebase only

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const interes = document.getElementById('interes').value;
        const mensaje = document.getElementById('mensaje').value;

        // Validación de campos obligatorios
        if (!nombre || !apellido || !email || !interes || !mensaje) {
            showToast("Por favor, completa todos los campos obligatorios.", "error", 3000);
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Por favor, ingresa un email válido.", "error", 3000);
            return;
        }

        // Preparar datos para enviar
        const formData = {
            name: nombre.trim(),
            lastName: apellido.trim(),
            email: email.trim().toLowerCase(),
            phone: telefono.trim() || '', // Teléfono opcional
            classroom: interes,
            mensaje: mensaje.trim(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isActive: true,
            statusMessage: "nuevo"
        };

        // Deshabilitar botón mientras se envía
        const submitButton = document.getElementById('submit-button__contact');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // Enviar a Firebase
        db.collection("mensajes").add(formData)
            .then(function () {
                // Éxito
                showToast(
                    '¡Gracias por tu mensaje! <br><br>' +
                    'Nos pondremos en contacto muy pronto.<br><br>',
                    'success',
                    5000
                );
                form.reset();
            })
            .catch(function (error) {
                // Error
                console.error('Error al enviar mensaje:', error);
                showToast(
                    'Hubo un problema al enviar tu mensaje. 😔<br><br>' +
                    'Por favor intenta nuevamente en unos minutos, o contáctanos directamente por WhatsApp.<br><br>',
                    'error',
                    5000
                );
            })
            .finally(function () {
                // Restaurar botón en cualquier caso
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });
});