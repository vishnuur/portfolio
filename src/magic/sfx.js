// Small sound helpers shared by the spells.

/** Plays one of the audio files in /public. Autoplay rejections are ignored. */
export const playSound = (src, volume = 1) => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
  return audio;
};

let audioCtx;
const getCtx = () => {
  if (typeof window === "undefined") return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  audioCtx ||= new Ctx();
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
};

/** A short airy "whoosh" (filtered noise sweep), generated on the fly. */
export const whoosh = ({ duration = 0.6, volume = 0.25 } = {}) => {
  const ctx = getCtx();
  if (!ctx) return;
  const frames = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.2;
  const now = ctx.currentTime;
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.exponentialRampToValueAtTime(2400, now + duration * 0.7);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + duration * 0.35);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + duration);
};

/** A soft magical chime: a few bell-like partials. */
export const chime = ({ volume = 0.18, base = 880 } = {}) => {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  [1, 1.5, 2, 3].forEach((ratio, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = base * ratio;
    const start = now + i * 0.06;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume / (i + 1), start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 1.5);
  });
};

/**
 * Smoothly moves an <audio> element's volume to `target` over `ms`.
 * Starting a new fade on the same element cancels the previous one.
 */
const fades = new WeakMap();
export const fadeVolume = (audio, target, ms = 600) => {
  if (!audio) return;
  cancelAnimationFrame(fades.get(audio));
  const from = audio.volume;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / ms);
    audio.volume = Math.max(0, Math.min(1, from + (target - from) * t));
    if (t < 1) fades.set(audio, requestAnimationFrame(step));
  };
  fades.set(audio, requestAnimationFrame(step));
};
