// condividi.js - Gestione invio modulo a Google Sheets

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const btnSubmit = document.getElementById('submitBtn');
    const alertSuccess = document.getElementById('alertSuccess');
    const alertError = document.getElementById('alertError');
    const selectGioco = document.getElementById('gioco');
    const inputGiocoAltro = document.getElementById('gioco_altro');

    // Mostra nascondi campo "Altro" per il Gioco
    if (selectGioco && inputGiocoAltro) {
        selectGioco.addEventListener('change', (e) => {
            if (e.target.value === 'Altro') {
                inputGiocoAltro.style.display = 'block';
                inputGiocoAltro.required = true;
            } else {
                inputGiocoAltro.style.display = 'none';
                inputGiocoAltro.required = false;
                inputGiocoAltro.value = '';
            }
        });
    }

    // Inizializzazione Firebase Hub
    const firebaseConfig = {
      apiKey: "AIzaSyD-n2m-kYEuzGXPMKclZTggf4Y5Zm8_cdM",
      authDomain: "prof-memmo-hub.firebaseapp.com",
      projectId: "prof-memmo-hub",
      storageBucket: "prof-memmo-hub.firebasestorage.app",
      messagingSenderId: "839149485689",
      appId: "1:839149485689:web:04ee4fa6237d94d0b71ea8"
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Nascondi gli alert precedenti
            alertSuccess.style.display = 'none';
            alertError.style.display = 'none';
            
            // Attiva stato di caricamento
            btnSubmit.disabled = true;
            btnSubmit.classList.add('loading');

            // Raccogli i dati del form
            const formData = new FormData(form);

            // Se il materiale selezionato è "Altro", sostituisci il valore con quello digitato
            if (formData.get('Materiale utilizzato') === 'Altro') {
                formData.set('Materiale utilizzato', formData.get('gioco_altro') || 'Altro');
            }
            formData.delete('gioco_altro');

            try {
                // Salva su Firebase
                await db.collection("hub_esperienze").add({
                    nome: formData.get('Nome') || "Anonimo",
                    email: formData.get('Email') || "",
                    ordine_scuola: formData.get('Ordine di scuola') || "",
                    materia: formData.get('Materia') || "",
                    gioco: formData.get('Materiale utilizzato') || "",
                    classe: formData.get('Classe') || "",
                    uso_materiale: formData.get('Uso materiale') || "",
                    reazione_studenti: formData.get('Reazione studenti') || "",
                    punti_forti: formData.get('Punti forti') || "",
                    difficolta: formData.get('Difficoltà') || "",
                    valutazione: formData.get('Valutazione') || "",
                    pubblicazione: formData.get('Pubblicazione') || "",
                    note: formData.get('Note') || "",
                    esperienza: formData.get('Uso materiale'), // per riassunto veloce
                    status: "pending",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Mostra successo
                alertSuccess.style.display = 'block';
                form.reset();
                window.scrollTo({ top: alertSuccess.offsetTop - 100, behavior: 'smooth' });

            } catch (error) {
                console.error('Errore durante l\'invio:', error);
                alertError.textContent = 'Si è verificato un errore durante l\'invio. Riprova più tardi.';
                alertError.style.display = 'block';
            } finally {
                // Disattiva stato di caricamento
                btnSubmit.disabled = false;
                btnSubmit.classList.remove('loading');
            }
        });
    }
});
