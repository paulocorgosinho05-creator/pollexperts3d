/**
 * Web Audio API procedural synthesizer for Pollexperts Profile Audio Kits
 * Produces authentic cyberpunk, synthwave, lo-fi, and industrial soundscapes
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private currentPreset: 'cyberpunk' | 'lofi' | 'heavy' | 'trap' = 'cyberpunk';
  private step = 0;
  private volume = 0.75;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(preset: 'cyberpunk' | 'lofi' | 'heavy' | 'trap' = 'cyberpunk') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    
    this.currentPreset = preset;
    this.isPlaying = true;
    this.step = 0;

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }

    const tempoMs = preset === 'lofi' ? 340 : preset === 'heavy' ? 190 : 217;

    this.intervalId = window.setInterval(() => {
      this.tick();
    }, tempoMs);

    this.tick();
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getFrequencyBars(): number[] {
    if (!this.analyser || !this.isPlaying) {
      return [10, 14, 8, 12, 16, 10, 18, 14, 12, 10, 8, 15, 11, 9, 14, 8];
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    const bars: number[] = [];
    const step = Math.max(1, Math.floor(data.length / 16));
    for (let i = 0; i < 16; i++) {
      const val = data[i * step] || 0;
      bars.push(Math.max(6, Math.floor((val / 255) * 42)));
    }
    return bars;
  }

  private tick() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const t = this.ctx.currentTime;
    this.step = (this.step + 1) % 16;

    if (this.currentPreset === 'cyberpunk') {
      const bassNotes = [73.42, 73.42, 82.41, 73.42, 98.0, 73.42, 82.41, 110.0];
      const leadNotes = [293.66, 369.99, 440.0, 587.33, 554.37, 440.0, 369.99, 329.63];

      if (this.step % 2 === 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(bassNotes[(this.step / 2) % bassNotes.length], t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, t);
        filter.frequency.exponentialRampToValueAtTime(150, t + 0.25);

        gain.gain.setValueAtTime(0.32, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.25);
      }

      if (this.step % 4 === 1 || this.step % 4 === 3) {
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.type = 'square';
        leadOsc.frequency.setValueAtTime(leadNotes[this.step % leadNotes.length], t);

        leadGain.gain.setValueAtTime(0.12, t);
        leadGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        leadOsc.connect(leadGain);
        leadGain.connect(this.masterGain);

        leadOsc.start(t);
        leadOsc.stop(t + 0.2);
      }

      if (this.step % 4 === 0) {
        this.triggerKick(t);
      }
      if (this.step === 4 || this.step === 12) {
        this.triggerSnare(t);
      }
    } else if (this.currentPreset === 'lofi') {
      if (this.step % 8 === 0) {
        const chord = [220.0, 277.18, 329.63, 415.3];
        chord.forEach(freq => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.08, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 1.3);
        });
      }
    } else if (this.currentPreset === 'heavy') {
      const riff = [82.41, 82.41, 98.0, 82.41, 123.47, 82.41];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(riff[this.step % riff.length], t);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.18);
    } else {
      if (this.step % 4 === 0) {
        this.triggerSub808(t);
      }
    }
  }

  private triggerKick(t: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    gain.gain.setValueAtTime(0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  private triggerSnare(t: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, t);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  private triggerSub808(t: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(75, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.4);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.46);
  }
}

export const audioSynth = new AudioSynthesizer();
