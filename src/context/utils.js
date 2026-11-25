/**
 * Marks an element as one that floats during Wingardium Leviosa.
 * The animation itself lives in Components/Fun/Leviosa.
 *
 * The second argument is the old per-section CSS animation class; it is kept
 * so existing call sites don't need to change, but is no longer used.
 */
export default function FloatingClass(extraClass = "", _legacyClass) {
  return `${extraClass} levitate`.trim();
}
