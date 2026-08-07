// Inizializzazione Firebase Hub Centralizzata
const firebaseConfig = {
  apiKey: "AIzaSyD-n2m-kYEuzGXPMKclZTggf4Y5Zm8_cdM",
  authDomain: "prof-memmo-hub.firebaseapp.com",
  projectId: "prof-memmo-hub",
  storageBucket: "prof-memmo-hub.firebasestorage.app",
  messagingSenderId: "839149485689",
  appId: "1:839149485689:web:04ee4fa6237d94d0b71ea8"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
