// GSAP is only needed by the magic spells, so it is downloaded on demand
// instead of being part of the main bundle. Every caller shares one download.
let gsapPromise;

export default function loadGsap() {
  gsapPromise ||= import("gsap").then((module) => module.gsap || module.default);
  return gsapPromise;
}
