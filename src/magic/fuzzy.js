// Forgiving matching for spoken spells. Speech recognition mishears magic
// words ("loomis", "knocks", "axio"), and people say a little more or less
// than the incantation, so phrases are compared by how they *sound*, over a
// sliding window of the spoken words.

/** Lowercase, strip accents and punctuation, collapse spaces. */
export const normalise = (text = "") =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/'/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** A rough "sounds like" spelling, so similar-sounding words compare equal. */
const sound = (word) =>
  word
    .replace(/ph/g, "f")
    .replace(/ck/g, "k")
    .replace(/qu/g, "kw")
    .replace(/q/g, "k")
    .replace(/x/g, "ks")
    .replace(/c(?=[eiy])/g, "s")
    .replace(/c/g, "k")
    .replace(/z/g, "s")
    .replace(/y/g, "i")
    .replace(/ee|ea|ie/g, "i")
    .replace(/oo|ou/g, "u")
    .replace(/(.)\1+/g, "$1");

const soundOf = (words) => words.map(sound).join("");

/** Edit distance between two strings. */
const levenshtein = (a, b) => {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = row;
  }
  return prev[b.length];
};

/** 0..1, how alike two sound-spellings are. */
const similarity = (a, b) =>
  1 - levenshtein(a, b) / Math.max(a.length, b.length, 1);

/** Short words need a closer match than long phrases. */
const threshold = (length) => (length <= 4 ? 0.75 : length <= 8 ? 0.7 : 0.66);

/**
 * Finds where in the spoken words a target phrase best appears.
 * Returns { score, end } (end = index after the matched words) or null.
 */
export const findPhrase = (spokenWords, target) => {
  const targetWords = target.split(" ");
  const targetSound = soundOf(targetWords);
  let best = null;
  const n = targetWords.length;
  for (let size = Math.max(1, n - 1); size <= n + 1; size++) {
    for (let start = 0; start + size <= spokenWords.length; start++) {
      const window = spokenWords.slice(start, start + size);
      const score = similarity(soundOf(window), targetSound);
      if (score >= threshold(targetSound.length) && (!best || score > best.score)) {
        best = { score, end: start + size, length: targetSound.length };
      }
    }
  }
  return best;
};

/** The best-matching option among `choices` ({ key: [phrases] }), or null. */
export const findChoice = (spokenWords, choices) => {
  let best = null;
  Object.entries(choices).forEach(([key, phrases]) => {
    phrases.forEach((phrase) => {
      const hit = findPhrase(spokenWords, phrase);
      if (hit && (!best || hit.score > best.score)) best = { key, score: hit.score };
    });
  });
  return best?.key || null;
};
