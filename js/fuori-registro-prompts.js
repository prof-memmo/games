/**
 * FUORI REGISTRO — Archivio Spunti di Riflessione & Domande Guida
 */

const FuoriRegistroPrompts = {
  prompts: [
    {
      id: "giudizio",
      text: "Se nessuno potesse giudicarti, cosa diresti?"
    },
    {
      id: "non-detto",
      text: "C'è qualcosa che vorresti dire a qualcuno, ma che probabilmente non gli dirai mai?"
    },
    {
      id: "opinione-altri",
      text: "Se potessi sapere cosa pensano davvero di te tutte le persone che conosci, vorresti davvero scoprirlo?"
    },
    {
      id: "identita-percezione",
      text: "Qual è una cosa che gli altri pensano di te e che non corrisponde a come ti senti davvero?"
    },
    {
      id: "parole-ascolto",
      text: "C'è qualcosa che avresti voluto sentirti dire oggi?"
    },
    {
      id: "comprensione",
      text: "Qual è una cosa di te che vorresti che gli altri capissero meglio?"
    },
    {
      id: "silenzio",
      text: "Qual è il pensiero che fai più spesso quando sei completamente da solo?"
    },
    {
      id: "coraggio",
      text: "C'è una scelta o un gesto che avresti voluto fare, ma hai avuto paura delle conseguenze?"
    },
    {
      id: "perdono",
      text: "C'è qualcosa che hai fatto a te stesso o a qualcun altro per cui vorresti perdonarti?"
    }
  ],

  getDailyPrompt() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % this.prompts.length;
    return this.prompts[index];
  },

  getRandomPrompt(excludeId = null) {
    const candidates = excludeId 
      ? this.prompts.filter(p => p.id !== excludeId)
      : this.prompts;
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }
};

window.FuoriRegistroPrompts = FuoriRegistroPrompts;
