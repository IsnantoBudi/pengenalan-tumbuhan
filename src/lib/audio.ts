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

      gain.gain.setValueAtTime(0.24, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.05);
    });
  }

  // Play a loud, cheerful, sparkling double "CRING-CRING! ✨" bell chime
  public playSparkleChime() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Harmonic bell partials: [frequency, startTime, duration, volume, waveType]
    const sparkles = [
      // First "Cring" (bright G6 + G7 bell sparkle)
      { freq: 1567.98, time: 0, dur: 0.28, vol: 0.35, type: "sine" as OscillatorType },
      { freq: 3135.96, time: 0, dur: 0.22, vol: 0.24, type: "triangle" as OscillatorType },
      { freq: 4703.94, time: 0.005, dur: 0.16, vol: 0.16, type: "sine" as OscillatorType },

      // Second "CRING!" (higher, louder, sparkling shimmer: C7 + E7 + C8)
      { freq: 2093.00, time: 0.085, dur: 0.42, vol: 0.42, type: "sine" as OscillatorType },
      { freq: 2637.02, time: 0.09, dur: 0.38, vol: 0.32, type: "triangle" as OscillatorType },
      { freq: 4186.01, time: 0.095, dur: 0.30, vol: 0.26, type: "sine" as OscillatorType },
      { freq: 5274.04, time: 0.10, dur: 0.22, vol: 0.18, type: "sine" as OscillatorType },
    ];

    sparkles.forEach((s) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = s.type;
      const startAt = now + s.time;

      osc.frequency.setValueAtTime(s.freq, startAt);

      // Fast crystalline attack + bell decay
      gain.gain.setValueAtTime(0.001, startAt);
      gain.gain.linearRampToValueAtTime(s.vol, startAt + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, startAt + s.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startAt);
      osc.stop(startAt + s.dur + 0.02);
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

  // Play a soft gliding pencil/brush stroke whoosh
  public playBrushStroke() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // AudioContext fallback
    }
  }

  // Play a joyful, rhythmic children applause and cheering sound effect
  public playApplause() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const clapCount = 14;

      // Layered synthesized handclaps with varied timing & pitch
      for (let i = 0; i < clapCount; i++) {
        const clapTime = now + (i * 0.08) + (Math.random() * 0.04);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        const freq = 600 + Math.random() * 800;
        osc.frequency.setValueAtTime(freq, clapTime);
        osc.frequency.exponentialRampToValueAtTime(120, clapTime + 0.045);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1200 + Math.random() * 600, clapTime);
        filter.Q.setValueAtTime(1.8, clapTime);

        gain.gain.setValueAtTime(0.18 + Math.random() * 0.08, clapTime);
        gain.gain.exponentialRampToValueAtTime(0.001, clapTime + 0.05);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(clapTime);
        osc.stop(clapTime + 0.06);
      }

      // Cheerful triumph bells layered on top
      const chimeNotes = [783.99, 1046.5, 1318.51, 1567.98]; // G5, C6, E6, G6
      chimeNotes.forEach((freq, idx) => {
        const chimeStart = now + 0.25 + idx * 0.1;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, chimeStart);

        gain.gain.setValueAtTime(0.2, chimeStart);
        gain.gain.exponentialRampToValueAtTime(0.001, chimeStart + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(chimeStart);
        osc.stop(chimeStart + 0.5);
      });
    } catch {
      // AudioContext fallback
    }
  }

  // Speak Indonesian number clearly
  public speakNumber(num: number) {
    const numberWords: Record<number, string> = {
      1: "Satu",
      2: "Dua",
      3: "Tiga",
      4: "Empat",
      5: "Lima",
      6: "Enam",
      7: "Tujuh",
      8: "Delapan",
      9: "Sembilan",
      10: "Sepuluh",
    };
    const word = numberWords[num] || String(num);
    this.speak(word);
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
