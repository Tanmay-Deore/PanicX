// Web Audio API Sound Engine for PANICX
// 100% synthesized sound effects - zero external audio assets required!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private clickCount: number = 0;
  private clickTimer: number | null = null;

  constructor() {
    // Read initial settings from localStorage if present
    try {
      const savedMute = localStorage.getItem('panicx_muted');
      if (savedMute !== null) {
        this.isMuted = JSON.parse(savedMute);
      }
      const savedVol = localStorage.getItem('panicx_volume');
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol);
      }
    } catch (e) {
      // fallback to defaults
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('panicx_muted', JSON.stringify(muted));
    } catch (e) {}
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem('panicx_volume', vol.toString());
    } catch (e) {}
  }

  private playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.1, gainVal: number = 0.2, freqRampTo?: number) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (freqRampTo) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, freqRampTo), this.ctx.currentTime + duration);
      }

      const totalGain = gainVal * this.volume;
      gain.gain.setValueAtTime(totalGain, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  // Comedic Sounds

  // 1. Normal click boop
  public playClick() {
    this.clickCount++;
    if (this.clickTimer) clearTimeout(this.clickTimer);
    this.clickTimer = window.setTimeout(() => { this.clickCount = 0; }, 1500);

    // Annoyed clicks escalate frequency and pitch
    const pitchBoost = Math.min(this.clickCount * 120, 1000);
    this.playTone(440 + pitchBoost, 'sine', 0.08, 0.25, 880 + pitchBoost);
  }

  // 2. Hover tick
  public playHover() {
    this.playTone(800, 'triangle', 0.03, 0.05, 1200);
  }

  // 3. Runaway button whoosh
  public playWhoosh() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const duration = 0.25;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + duration);
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {}
  }

  // 4. Do Not Click dramatic boom
  public playBoom() {
    this.playTone(150, 'sawtooth', 0.8, 0.4, 30);
  }

  // 5. Loading startup sound
  public playStartup() {
    [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.2, 0.2);
      }, idx * 70);
    });
  }

  // 6. 99% record scratch style original UI sound
  public playRecordScratch() {
    this.playTone(1200, 'sawtooth', 0.3, 0.3, 100);
  }

  // 7. Loading backward error sound
  public playDescendingError() {
    this.playTone(600, 'sawtooth', 0.4, 0.3, 150);
  }

  // 8. Wrong action / error beep
  public playError() {
    this.playTone(180, 'square', 0.25, 0.3);
  }

  // 9. Popup open - dramatic hit
  public playPopupOpen() {
    this.playTone(300, 'sawtooth', 0.3, 0.3, 900);
  }

  // 10. Popup close - tiny door slam
  public playPopupClose() {
    this.playTone(350, 'triangle', 0.1, 0.2, 80);
  }

  // 11. Fast scroll skid/brake effect
  public playSkid() {
    this.playTone(1500, 'sawtooth', 0.15, 0.15, 300);
  }

  // 12. Idle cough / whisper
  public playIdleCough() {
    this.playTone(220, 'triangle', 0.2, 0.1, 180);
  }

  // 13. Easter egg celebration chime
  public playCelebration() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playTone(note, 'sine', 0.3, 0.25);
      }, i * 90);
    });
  }

  // 14. Rubber squash / stretch sound
  public playRubber() {
    this.playTone(300, 'sine', 0.15, 0.25, 600);
  }

  // 15. Glitch sound
  public playGlitch() {
    this.playTone(800 + Math.random() * 800, 'square', 0.05, 0.15);
  }
}

export const sound = new SoundEngine();
