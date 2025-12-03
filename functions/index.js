const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Cargar variables de entorno
require('dotenv').config();

admin.initializeApp();

exports.sendContactEmail = functions.firestore
  .document('mensajes/{mensajeId}')
  .onCreate(async (snap, context) => {
    const contactData = snap.data();
    const { name, lastName, email, phone, classroom, mensaje, createdAt } = contactData;

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    console.log('📧 Iniciando envío de email para:', name, lastName);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    // Formatear la fecha
    const fecha = createdAt ? new Date(createdAt.toDate()).toLocaleString('es-AR', {
      dateStyle: 'full',
      timeStyle: 'short'
    }) : 'Fecha no disponible';

    const mailOptions = {
      from: `Jardín Hermano Sol <${emailUser}>`,
      to: 'infohermanosol@gmail.com', // ← CAMBIAR por el email donde querés recibir los mensajes
      subject: `📩 Nueva consulta de ${name} ${lastName} - ${classroom}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&family=Inter:wght@400;500;600&family=Literata:wght@400;600&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #F8F7F4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #FCFCF7;
            }
            .header {
              background: linear-gradient(135deg, #FF9F1C 0%, #fcdd44 100%);
              padding: 30px 20px;
              text-align: center;
            }
            .logo {
              font-family: 'Cherry Bomb One', cursive;
              color: #011936;
              font-size: 28px;
              margin: 0;
              text-shadow: 2px 2px 0px #FF9F1C;
            }
            .subtitle {
              color: #011936;
              font-size: 14px;
              margin: 8px 0 0 0;
              font-weight: 500;
            }
            .content {
              padding: 30px 20px;
            }
            .section-title {
              font-family: 'Literata', serif;
              color: #011936;
              font-size: 20px;
              font-weight: 600;
              margin: 0 0 20px 0;
              padding-bottom: 10px;
              border-bottom: 3px solid #fcdd44;
            }
            .info-box {
              background-color: #FFE9A5;
              padding: 20px;
              border-radius: 2px;
              margin: 20px 0;
              border-left: 4px solid #E87A30;
            }
            .info-row {
              margin-bottom: 12px;
            }
            .info-row:last-child {
              margin-bottom: 0;
            }
            .info-label {
              font-weight: 600;
              color: #011936;
              font-size: 14px;
            }
            .info-value {
              color: #474647;
              font-size: 14px;
              margin-top: 4px;
            }
            .info-value a {
              color: #E87A30;
              text-decoration: none;
            }
            .info-value a:hover {
              color: #CF6017;
            }
            .message-box {
              background-color: #FCFCF7;
              padding: 20px;
              border-radius: 2px;
              border-left: 4px solid #177e89;
              margin: 20px 0;
            }
            .message-title {
              font-family: 'Literata', serif;
              color: #011936;
              font-size: 16px;
              font-weight: 600;
              margin: 0 0 12px 0;
            }
            .message-text {
              color: #474647;
              line-height: 1.6;
              margin: 0;
              white-space: pre-wrap;
              word-wrap: break-word;
              font-size: 16px;
            }
            .action-button {
              text-align: center;
              margin: 30px 0;
            }
            .btn {
              display: inline-block;
              background-color: #E87A30;
              color: #FCFCF7;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 2px;
              font-weight: 600;
              font-size: 16px;
              transition: background-color 0.2s ease;
            }
            .btn:hover {
              background-color: #CF6017;
              color: #FCFCF7;
            }
            .footer {
              background-color: #011936;
              color: #FCFCF7;
              padding: 20px;
              text-align: center;
              font-size: 12px;
            }
            .footer-logo {
              font-family: 'Cherry Bomb One', cursive;
              color: #fcdd44;
              font-size: 18px;
              margin: 0 0 8px 0;
              text-shadow: 2px 2px 0px #FF9F1C;
            }
            .footer-text {
              margin: 4px 0;
              opacity: 0.8;
            }
            
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1 class="logo">Jardín Hermano Sol</h1>
              <p class="subtitle">Nueva consulta desde la web</p>
            </div>
            
            <!-- Content -->
            <div class="content">
              <h2 class="section-title">Datos del contacto</h2>
                            
              <div class="info-box">
                <div class="info-row">
                  <div class="info-label">👤 Nombre completo:</div>
                  <div class="info-value">${name} ${lastName}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">📧 Email:</div>
                  <div class="info-value">
                    <a href="mailto:${email}">${email}</a>
                  </div>
                </div>
                
                ${phone ? `
                <div class="info-row">
                  <div class="info-label">📱 Teléfono:</div>
                  <div class="info-value">
                    <a href="tel:${phone}">${phone}</a>
                  </div>
                </div>
                ` : ''}
                
                <div class="info-row">
                  <div class="info-label">🎒 Sala de interés:</div>
                  <div class="info-value">${classroom}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">📅 Fecha de consulta:</div>
                  <div class="info-value">${fecha}</div>
                </div>
              </div>
              
              <h2 class="section-title">Mensaje</h2>
              
              <div class="message-box">
                <h3 class="message-title">MENSAJE:</h3>
                <p class="message-text">${mensaje}</p>
              </div>
              
              <div class="action-button">
                <a href="mailto:${email}?subject=Re: Consulta sobre ${classroom}" class="btn">
                  Responder a ${name}
                </a>
              </div>
              
              ${phone ? `
              <div style="text-align: center; margin-top: 10px;">
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" 
                   style="color: #177e89; text-decoration: none; font-size: 14px;">
                  💬 Responder por WhatsApp
                </a>
              </div>
              ` : ''}
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p class="footer-logo">Jardín Hermano Sol</p>
              <p class="footer-text">40 años cultivando infancias felices</p>
              <p class="footer-text">Condarco 1652, Villa Santa Rita</p>
              <p class="footer-text" style="margin-top: 12px; font-size: 11px;">
                Este email fue enviado automáticamente desde el formulario de contacto
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email enviado exitosamente a:', mailOptions.to);

      // Actualizar el documento en Firestore
      await snap.ref.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error('❌ Error al enviar email:', error);

      // Guardar el error en Firestore
      await snap.ref.update({
        emailError: error.message,
        emailSent: false,
        emailErrorAt: admin.firestore.FieldValue.serverTimestamp()
      });

      throw error;
    }
  });