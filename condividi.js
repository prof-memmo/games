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

    // SOSTITUISCI QUESTO URL CON QUELLO FORNITO DA GOOGLE APPS SCRIPT
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzG4UYa6QdLimSB8AO40Qut51ot1vv8IyFUlKdSNTl3n-nkdBY1_QWptbhMKLrUWf57vg/exec';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Nascondi gli alert precedenti
            alertSuccess.style.display = 'none';
            alertError.style.display = 'none';

            // Verifica che l'URL dello script sia stato impostato
            if (SCRIPT_URL === 'INSERISCI_QUI_IL_TUO_URL_SCRIPT_GOOGLE') {
                alertError.textContent = 'Errore di configurazione: Manca l\'URL di Google Apps Script. Contattare l\'amministratore.';
                alertError.style.display = 'block';
                return;
            }

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
                // Invia i dati tramite POST all'Apps Script
                // Google Apps Script a volte ha problemi con il CORS su POST diretti da browser,
                // ma usando fetch con no-cors e FormData funziona perfettamente per l'inserimento.
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
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
