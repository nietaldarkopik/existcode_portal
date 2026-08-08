// Lightweight Web Audio synth for theme-switcher interaction feedback — no
// binary audio assets, ported from themes/ultra-themes' SciFiAudioEngine.
const MUTE_STORAGE_KEY = "existcode-theme-muted";

class ThemeSoundEngine {
  private ctx: AudioContext | null = null;
  private muted = typeof window !== "undefined" && window.localStorage.getItem(MUTE_STORAGE_KEY) === "1";
  private readonly volume = 0.15;

  private ensureCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx?.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  private tone(type: OscillatorType, freqFrom: number, freqTo: number, duration: number, gainScale = 0.5) {
    if (this.muted) return;
    try {
      const ctx = this.ensureCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqFrom, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqTo, ctx.currentTime + duration);
      gain.gain.setValueAtTime(this.volume * gainScale, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore — audio is a non-critical enhancement.
    }
  }

  isMuted() {
    return this.muted;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== "undefined") window.localStorage.setItem(MUTE_STORAGE_KEY, muted ? "1" : "0");
  }

  playHover() {
    this.tone("sine", 440, 880, 0.05, 0.3);
  }

  playClick() {
    this.tone("triangle", 1200, 300, 0.08, 0.5);
  }

  playSuccess() {
    if (this.muted) return;
    try {
      const ctx = this.ensureCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(this.volume * 0.3, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.12);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new ThemeSoundEngine();
