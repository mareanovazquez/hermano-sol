// config.js - Configuración de Firebase v8

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVWhu7TukZq60j6g93uXg4yeRQbjxvyB4",
    authDomain: "mensajes-hermano-sol.firebaseapp.com",
    projectId: "mensajes-hermano-sol",
    storageBucket: "mensajes-hermano-sol.firebasestorage.app",
    messagingSenderId: "992985767415",
    appId: "1:992985767415:web:51b99c724860a80a6d62f2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



