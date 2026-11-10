// Web Audio API Synthesizer, BGM, & Speech Engine

class AudioManager {
  private ctx: AudioContext | null = null;
  private audioEnabled: boolean = true;
  private sfxEnabled: boolean = true;
  private speechEnabled: boolean = true;
  private bgmAudio: HTMLAudioElement | null = null;
  private readonly defaultBgmVolume: number = 0.25;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private initBgm(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!this.bgmAudio) {
      this.bgmAudio = new Audio("/audio/bgm.mp3");
      this.bgmAudio.loop = true;
      this.bgmAudio.autoplay = true;
      this.bgmAudio.volume = this.defaultBgmVolume;
    }
    return this.bgmAudio;
  }

  // Start BGM on user interaction (resolves browser autoplay policy)
  public startBgm() {
    if (!this.audioEnabled) return;
    const bgm = this.initBgm();
    if (bgm && bgm.paused) {
      bgm.play().catch(() => {
        // Ignored if user hasn't interacted yet
      });
    }
  }

  // Unified master audio toggle (controls both SFX and BGM)
  public setAudioEnabled(enabled: boolean) {
    this.audioEnabled = enabled;
    this.sfxEnabled = enabled;

    const bgm = this.initBgm();
    if (!enabled) {
      if (bgm) bgm.pause();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      if (bgm) {
        bgm.volume = this.defaultBgmVolume;
        bgm.play().catch(() => {});
      }
    }
  }

  public isAudioEnabled(): boolean {
    return this.audioEnabled;
  }

  public setSfxEnabled(enabled: boolean) {
    this.setAudioEnabled(enabled);
  }

  public isSfxEnabled(): boolean {
    return this.audioEnabled;
  }

  public setSpeechEnabled(enabled: boolean) {
    this.speechEnabled = enabled;
    if (!enabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isSpeechEnabled(): boolean {
    return this.speechEnabled;
  }

  // Play a crisp, wooden/bubble click for UI buttons
  public playClick() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.045);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Play a gentle pop when touching/selecting an item
  public playPop() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Play a rewarding chime when correctly placed
  public playSuccess() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      const start = now + idx * 0.07;
      const duration = 0.25;

      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.05);
    });
  }

  // Play a gentle wobble/boing when incorrectly placed
  public playError() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.22);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    // Filter to soften the sawtooth buzz
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.23);
  }

  // Play a victory fanfare on level completion
  public playFanfare() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Duck BGM volume during victory celebration
    if (this.bgmAudio && !this.bgmAudio.paused) {
      this.bgmAudio.volume = 0.05;
      setTimeout(() => {
        if (this.bgmAudio && this.audioEnabled) {
          this.bgmAudio.volume = this.defaultBgmVolume;
        }
      }, 2000);
    }

    const melody = [
      { freq: 523.25, dur: 0.12, delay: 0 },    // C5
      { freq: 659.25, dur: 0.12, delay: 0.12 }, // E5
      { freq: 783.99, dur: 0.12, delay: 0.24 }, // G5
      { freq: 1046.5, dur: 0.45, delay: 0.36 }, // C6
      { freq: 880.0,  dur: 0.15, delay: 0.85 }, // A5
      { freq: 1046.5, dur: 0.6,  delay: 1.02 }, // C6 long
    ];

    const now = ctx.currentTime;

    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      const start = now + note.delay;

      osc.frequency.setValueAtTime(note.freq, start);

      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + note.dur + 0.05);
    });
  }

  // Indonesian Text-to-Speech narration with onEnd callback support
  public speak(text: string, onEnd?: () => void) {
    if (!this.speechEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.95; // slightly slower for clear classroom diction
      utterance.pitch = 1.05; // friendly tone

      // Pick Indonesian voice if available
      const voices = window.speechSynthesis.getVoices();
      const indonesianVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes("id") ||
          v.lang.toLowerCase().includes("indonesia") ||
          v.name.toLowerCase().includes("indonesian")
      );
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }

      if (onEnd) {
        let called = false;
        const safeCallback = () => {
          if (!called) {
            called = true;
            onEnd();
          }
        };
        utterance.onend = safeCallback;
        utterance.onerror = safeCallback;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  // Promise-based speak to sequence announcements sequentially
  public speakAsync(text: string): Promise<void> {
    return new Promise((resolve) => {
      this.speak(text, resolve);
    });
  }
}

export const soundEngine = new AudioManager();
