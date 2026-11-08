import fs from "fs";
import path from "path";

// Generate clean PCM WAV files
function createWavBuffer(sampleRate, samples) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write samples (16-bit signed integer)
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intVal = s < 0 ? s * 0x8000 : s * 0x7fff;
    buffer.writeInt16LE(Math.floor(intVal), 44 + i * 2);
  }

  return buffer;
}

const sampleRate = 44100;
const soundsDir = path.resolve("public", "sounds");
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// 1. Pop sound (gentle touch/selection, 0.08s)
{
  const duration = 0.08;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const freq = 440 + 440 * (t / duration);
    const env = 1 - t / duration;
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.4;
  }
  fs.writeFileSync(path.join(soundsDir, "pop.wav"), createWavBuffer(sampleRate, samples));
}

// 2. Correct chime (C5 -> E5 -> G5 -> C6 arpeggio, 0.5s)
{
  const duration = 0.55;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const notes = [
    { freq: 523.25, start: 0, dur: 0.25 },
    { freq: 659.25, start: 0.08, dur: 0.25 },
    { freq: 783.99, start: 0.16, dur: 0.25 },
    { freq: 1046.5, start: 0.24, dur: 0.3 },
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;
    for (const note of notes) {
      if (t >= note.start && t < note.start + note.dur) {
        const localT = t - note.start;
        const env = Math.exp(-localT * 8);
        sample += Math.sin(2 * Math.PI * note.freq * localT) * env * 0.25;
      }
    }
    samples[i] = sample;
  }
  fs.writeFileSync(path.join(soundsDir, "correct.wav"), createWavBuffer(sampleRate, samples));
}

// 3. Wrong boing/buzz (descending pitch, 0.25s)
{
  const duration = 0.25;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const freq = 220 - 90 * (t / duration);
    const env = Math.exp(-t * 10);
    // Soft triangle/sine blend
    const wave = 0.7 * Math.sin(2 * Math.PI * freq * t) + 0.3 * Math.sin(4 * Math.PI * freq * t);
    samples[i] = wave * env * 0.35;
  }
  fs.writeFileSync(path.join(soundsDir, "wrong.wav"), createWavBuffer(sampleRate, samples));
}

// 4. Victory fanfare (happy educational tune, 1.4s)
{
  const duration = 1.4;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const notes = [
    { freq: 523.25, start: 0.0, dur: 0.14 },
    { freq: 659.25, start: 0.14, dur: 0.14 },
    { freq: 783.99, start: 0.28, dur: 0.14 },
    { freq: 1046.5, start: 0.42, dur: 0.45 },
    { freq: 880.0,  start: 0.90, dur: 0.15 },
    { freq: 1046.5, start: 1.05, dur: 0.35 },
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;
    for (const note of notes) {
      if (t >= note.start && t < note.start + note.dur) {
        const localT = t - note.start;
        const env = Math.exp(-localT * 6);
        sample += (Math.sin(2 * Math.PI * note.freq * localT) + 0.2 * Math.sin(4 * Math.PI * note.freq * localT)) * env * 0.25;
      }
    }
    samples[i] = sample;
  }
  fs.writeFileSync(path.join(soundsDir, "victory.wav"), createWavBuffer(sampleRate, samples));
}

console.log("Successfully generated all educational WAV audio assets in public/sounds/!");
