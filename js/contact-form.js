// contact-form.js - Jardín Hermano Sol - Versión mejorada UX con Formspree optimizado

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const interes = document.getElementById('interes').value;
        const mensaje = document.getElementById('mensaje').value;

        // Crear objeto con datos para Firebase
        const formData = {
            name: nombre.trim(),
            lastName: apellido.trim(),
            email: email.trim().toLowerCase(),
            phone: telefono.trim() || '',
            classroom: interes,
            mensaje: mensaje.trim(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isActive: true,
            statusMessage: "nuevo"
        };

        // Función para enviar a Firebase
        function sendToFirebase() {
            return db.collection("mensajes").add(formData);
        }

        // Función para enviar a Formspree con formato mejorado
        function sendToFormspree() {
            const formspreeUrl = 'https://formspree.io/f/xlgrrqzo';

            const formspreeData = new FormData();

            // Datos básicos
            formspreeData.append('Nombre', nombre);
            formspreeData.append('Apellido', apellido);
            formspreeData.append('Email', email);

            if (telefono.trim()) {
                formspreeData.append('Teléfono', telefono);
            }

            formspreeData.append('Sala de interés', interes);

            // Mensaje estructurado mejor
            const mensajeFormateado = `
═══════════════════════════════════════
📧 NUEVO MENSAJE 
📅 ${new Date().toLocaleString('es-AR')}
═══════════════════════════════════════

👤 DATOS DEL INTERESADO:
   • Nombre: ${nombre} ${apellido}
   • Email: ${email}
   ${telefono.trim() ? `• Teléfono: ${telefono}` : ''}
   • Sala de interés: ${interes}

💬 MENSAJE:
${mensaje}

═══════════════════════════════════════
🌐 Enviado desde: jardinhermanosol.com.ar
═══════════════════════════════════════
            `.trim();

            formspreeData.append('Mensaje', mensajeFormateado);

            // Campos especiales de Formspree
            formspreeData.append('_replyto', email); // Para responder directo
            formspreeData.append('_subject', `✨ CONSULTAS WEB - ${nombre} ${apellido} (${interes})`);

            return fetch(formspreeUrl, {
                method: 'POST',
                body: formspreeData,
                headers: {
                    'Accept': 'application/json'
                }
            });
        }

        // Validación - solo campos obligatorios
        if (!nombre || !apellido || !email || !interes || !mensaje) {
            showToast("Por favor, completá todos los campos obligatorios.", "error", 3000);
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Por favor, ingresá un email válido.", "error", 3000);
            return;
        }

        const submitButton = document.getElementById('submit-button__contact');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        function resetButton() {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }

        Promise.allSettled([sendToFirebase(), sendToFormspree()])
            .then(function (results) {
                const firebaseResult = results[0];
                const formspreeResult = results[1];

                const firebaseSuccess = firebaseResult.status === 'fulfilled';
                const formspreeSuccess =
                    formspreeResult.status === 'fulfilled' &&
                    formspreeResult.value?.ok;

                // Primero manejar el resultado del usuario
                if (firebaseSuccess || formspreeSuccess) {
                    showToast(
                        '¡Gracias por tu mensaje! <br><br>' +
                        'Nos pondremos en contacto muy pronto.<br><br>',
                        'success',
                        5000
                    );
                    form.reset();
                } else {
                    showToast(
                        'Hubo un problema al enviar tu mensaje. 😔<br><br>' +
                        'Por favor intentá nuevamente en unos minutos, o contáctanos directamente por WhatsApp.<br><br>',
                        'error',
                        5000
                    );
                    console.error(
                        'Error enviando el formulario a ambos servicios. - FIREBASE: ' +
                        firebaseResult.reason +
                        ', FORMSPREE: ' +
                        (formspreeResult.reason || formspreeResult.value?.status)
                    );
                }

                // Después logs detallados para debugging
                if (!firebaseSuccess) {
                    console.error('Firebase error:', firebaseResult.reason);
                }
                if (!formspreeSuccess) {
                    if (formspreeResult.status === 'rejected') {
                        console.error('Formspree error:', formspreeResult.reason);
                    } else {
                        console.error('Formspree HTTP error:', formspreeResult.value?.status);
                    }
                }

                resetButton();
            });
    });
});