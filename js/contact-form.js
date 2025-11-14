// contact-form.js - Jardín Hermano Sol - Versión mejorada UX

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

        // Crear objeto con datos - teléfono puede estar vacío
        const formData = {
            name: nombre.trim(),
            lastName: apellido.trim(),
            email: email.trim().toLowerCase(),
            phone: telefono.trim() || '', // Permitir cadena vacía
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

        // Función para enviar a Formspree
        function sendToFormspree() {
            const formspreeUrl = 'https://formspree.io/f/meopyqpk';

            const formspreeData = new FormData();
            formspreeData.append('Nombre', nombre);
            formspreeData.append('Apellido', apellido);
            formspreeData.append('Email', email);
            if (telefono.trim()) { // Solo agregar si hay teléfono
                formspreeData.append('Telefono', telefono);
            }
            formspreeData.append('Sala de interés', interes);
            formspreeData.append('Mensaje', mensaje);
            formspreeData.append('_subject', `Mensaje de ${nombre} ${apellido} - ${interes}`);

            return fetch(formspreeUrl, {
                method: 'POST',
                body: formspreeData,
                headers: {
                    'Accept': 'application/json'
                }
            });
        }

        // Validación simplificada - solo campos obligatorios
        if (!nombre || !apellido || !email || !interes || !mensaje) {
            showToast("Por favor, completa todos los campos obligatorios.", "error", 3000);
            return;
        }

        // Solo validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Por favor, ingresa un email válido.", "error", 3000);
            return;
        }

        const submitButton = document.getElementById('submit-button__contact');
        const originalButtonText = submitButton.textContent; // Capturar texto original
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...'; // Cambiar texto de forma segura

        function resetButton() {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText; // Restaurar texto original
        }

        Promise.all([sendToFirebase(), sendToFormspree()])
            .then(function (results) {
                showToast(
                    '¡Gracias por tu mensaje! <br><br>' +
                    'Nos pondremos en contacto muy pronto.<br><br>',
                    'success',
                    5000
                );
                form.reset();
                resetButton();
            })
            .catch(function (error) {
                console.error('Error:', error);

                sendToFirebase()
                    .then(function () {
                        showToast(
                            '¡Gracias por tu mensaje! <br><br>' +
                            'Nos pondremos en contacto muy pronto.<br><br>',
                            'success',
                            5000
                        );
                        form.reset();
                        resetButton();
                    })
                    .catch(function (firebaseError) {
                        console.error('Firebase error:', firebaseError);

                        sendToFormspree()
                            .then(function (response) {
                                if (response.ok) {
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
                                        'Por favor intenta nuevamente en unos minutos, o contáctanos directamente por WhatsApp.<br><br>',
                                        'error',
                                        5000
                                    );
                                }
                                resetButton();
                            })
                            .catch(function (formspreeError) {
                                console.error('Formspree error:', formspreeError);
                                showToast(
                                    'Hubo un problema al enviar tu mensaje. 😔<br><br>' +
                                    'Por favor intenta nuevamente en unos minutos, o contáctanos directamente por WhatsApp.<br><br>',
                                    'error',
                                    5000
                                );
                                resetButton();
                            });
                    });
            });
    });
});