// Servizio di gestione Database (Firestore) per l'Hub Vetrina

window.HubDB = {
    saveContactMessage: async function(name, email, topic, message) {
        if (typeof firebase === 'undefined') return;
        try {
            await firebase.firestore().collection("hub_posta").add({
                nome: name,
                email: email,
                topic: topic,
                messaggio: message,
                site_origin: "prof-memmo-games",
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch(e) {
            console.error("Errore salvataggio posta su Hub:", e);
        }
    },
    
    saveFeedback: async function(dataObj) {
        if (typeof firebase === 'undefined') return;
        try {
            dataObj.timestamp = firebase.firestore.FieldValue.serverTimestamp();
            await firebase.firestore().collection("hub_esperienze").add(dataObj);
        } catch(e) {
            console.error("Errore salvataggio feedback su Hub:", e);
            throw e;
        }
    }
};
