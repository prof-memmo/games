/**
 * FUORI REGISTRO — Thoughts Service (Integrato nel Portale)
 */

const FuoriRegistroThoughts = {
  COLLECTION: "fuori_registro_thoughts",
  STATS_DOC: "fuori_registro_stats",

  async sendAnonymousThought({ text, promptId, role }) {
    const payload = {
      textLength: text.length,
      hasPrompt: !!promptId,
      promptId: promptId || "free_thought",
      role: role || "anonimo",
      createdAt: (window.firebase && window.firebase.firestore && firebase.firestore.FieldValue) ? firebase.firestore.FieldValue.serverTimestamp() : new Date(),
      status: "released_private",
      isPublic: false
    };

    if (window.firebase && window.firebase.firestore) {
      try {
        const db = window.firebase.firestore();
        await db.collection(this.COLLECTION).add(payload);
        
        const statsRef = db.collection("hub_ecosystem_stats").doc(this.STATS_DOC);
        await statsRef.set({
          totalThoughts: firebase.firestore.FieldValue.increment(1),
          lastReleasedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn("Invio su Firestore non riuscito (salvataggio locale):", err);
      }
    }

    let localCount = parseInt(localStorage.getItem('fuori_registro_local_count') || '0', 10);
    localCount++;
    localStorage.setItem('fuori_registro_local_count', localCount);

    return { success: true };
  },

  async getSilentCounter() {
    const baseOffset = 47;
    if (window.firebase && window.firebase.firestore) {
      try {
        const db = window.firebase.firestore();
        const doc = await db.collection("hub_ecosystem_stats").doc(this.STATS_DOC).get();
        if (doc.exists && doc.data().totalThoughts) {
          return baseOffset + doc.data().totalThoughts;
        }
      } catch (e) {}
    }

    const localCount = parseInt(localStorage.getItem('fuori_registro_local_count') || '0', 10);
    const hour = new Date().getHours();
    const daySeed = (new Date().getDate() * 7 + hour * 3) % 25;
    return baseOffset + daySeed + localCount;
  }
};

window.FuoriRegistroThoughts = FuoriRegistroThoughts;
