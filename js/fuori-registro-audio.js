/**
 * FUORI REGISTRO — Audio & Music Player System (Integrato nel Portale)
 */

const FuoriRegistroAudio = {
  ctx: null,
  isMuted: false,
  isPlayingMusic: false,
  currentTrackIndex: 0,
  audioEl: null,

  tracks: [
    { title: "Hazelwood - At Ease", src: "assets/audio/Hazelwood - At Ease (freetouse.com).mp3" },
    { title: "Epic Spectrum - Forgiveness", src: "assets/audio/Epic Spectrum - Forgiveness (freetouse.com).mp3" },
    { title: "Nebulite - Kyoto", src: "assets/audio/Nebulite - Kyoto (freetouse.com).mp3" },
    { title: "Aventure - Close Friends", src: "assets/audio/Aventure - Close Friends (freetouse.com).mp3" },
    { title: "Nebulite - Mountain", src: "assets/audio/Nebulite - Mountain (freetouse.com).mp3" },
    { title: "Waesto - Morning", src: "assets/audio/Waesto - Morning (freetouse.com).mp3" },
    { title: "Zambolino - Smooth Place", src: "assets/audio/Zambolino - Smooth Place (freetouse.com).mp3" },
    { title: "Burgundy - Chances", src: "assets/audio/Burgundy - Chances (freetouse.com).mp3" },
    { title: "Nebulite - A New Day", src: "assets/audio/Nebulite - A New Day (freetouse.com).mp3" },
    { title: "massobeats - peach prosecco", src: "assets/audio/massobeats - peach prosecco (freetouse.com).mp3" }
  ],

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("AudioContext not supported");
    }

    this.audioEl = new Audio();
    this.audioEl.loop = false;
    this.audioEl.volume = 0.25;
    this.audioEl.addEventListener('ended', () => this.nextTrack());
  },

  resumeCtx() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playReleaseChime() {
    if (this.isMuted) return;
    this.resumeCtx();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), this.ctx.currentTime + idx * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 1.9);
    });
  },

  playSoftClick() {
    if (this.isMuted) return;
    this.resumeCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  },

  togglePlay() {
    if (!this.audioEl) return;
    this.resumeCtx();

    if (this.isPlayingMusic) {
      this.audioEl.pause();
      this.isPlayingMusic = false;
    } else {
      if (!this.audioEl.src || this.audioEl.src === window.location.href) {
        this.audioEl.src = this.tracks[this.currentTrackIndex].src;
      }
      this.audioEl.play().then(() => {
        this.isPlayingMusic = true;
      }).catch(err => {
        console.warn("Autoplay prevented:", err);
        this.isPlayingMusic = false;
      });
    }
    this.updateUI();
  },

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.playCurrentTrack();
  },

  playCurrentTrack() {
    if (!this.audioEl) return;
    this.resumeCtx();
    this.audioEl.src = this.tracks[this.currentTrackIndex].src;
    if (this.isPlayingMusic) {
      this.audioEl.play().catch(e => console.warn(e));
    }
    this.updateUI();
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioEl) {
      this.audioEl.muted = this.isMuted;
    }
    this.updateUI();
  },

  updateUI() {
    const playBtn = document.getElementById('music-play-btn');
    if (playBtn) {
      playBtn.innerHTML = this.isPlayingMusic 
        ? '<i class="fa-solid fa-pause"></i>' 
        : '<i class="fa-solid fa-play"></i>';
      playBtn.title = this.isPlayingMusic ? "Metti in pausa" : "Riproduci musica";
    }

    const titleEl = document.getElementById('music-track-title');
    if (titleEl && this.tracks[this.currentTrackIndex]) {
      titleEl.textContent = this.tracks[this.currentTrackIndex].title;
    }

    const muteBtn = document.getElementById('music-mute-toggle-btn');
    if (muteBtn) {
      muteBtn.innerHTML = this.isMuted
        ? '<i class="fa-solid fa-volume-xmark"></i> Attiva Musica'
        : '<i class="fa-solid fa-volume-high"></i> Disattiva Musica';
    }

    const navBtn = document.getElementById('fr-music-toggle-btn');
    if (navBtn) {
      navBtn.innerHTML = this.isPlayingMusic 
        ? '<i class="ph-bold ph-pause"></i> Pausa Musica' 
        : '<i class="ph-bold ph-music-notes"></i> Musica Ambient';
    }
  }
};

window.FuoriRegistroAudio = FuoriRegistroAudio;
