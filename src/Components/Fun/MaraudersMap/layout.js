// Room layouts for the Marauder's Map. Rooms are keyed by section (see
// SECTIONS in data/profile.js). Corridors join rooms that share a row or a
// column; their exact ends are worked out from the room boxes.

const desktop = {
  viewBox: [1200, 780],
  title: { y: 58, size: 1 },
  rooms: {
    about: { x: 110, y: 205, w: 240, h: 165 },
    home: { x: 480, y: 205, w: 240, h: 165 },
    skills: { x: 850, y: 205, w: 240, h: 165 },
    projects: { x: 110, y: 525, w: 240, h: 185 },
    experience: { x: 480, y: 525, w: 240, h: 185 },
    contact: { x: 850, y: 525, w: 240, h: 185 },
  },
  corridors: [
    ["about", "home"],
    ["home", "skills"],
    ["home", "experience"],
    ["about", "projects"],
    ["skills", "contact"],
    ["projects", "experience"],
    ["experience", "contact"],
  ],
  // "You" follows the visitor's pointer; "Vishnu U R" wanders the corridors.
  walkers: [
    { name: "You", start: "home", follow: true },
    { name: "Vishnu U R", start: "experience" },
  ],
  labelSize: 25,
  subSize: 15,
};

const mobile = {
  viewBox: [420, 1000],
  title: { y: 46, size: 0.62 },
  rooms: {
    home: { x: 25, y: 200, w: 165, h: 170 },
    about: { x: 230, y: 200, w: 165, h: 170 },
    skills: { x: 25, y: 470, w: 165, h: 170 },
    projects: { x: 230, y: 470, w: 165, h: 170 },
    experience: { x: 25, y: 740, w: 165, h: 170 },
    contact: { x: 230, y: 740, w: 165, h: 170 },
  },
  corridors: [
    ["home", "about"],
    ["skills", "projects"],
    ["experience", "contact"],
    ["home", "skills"],
    ["about", "projects"],
    ["skills", "experience"],
    ["projects", "contact"],
  ],
  // "You" follows the visitor's pointer; "Vishnu U R" wanders the corridors.
  walkers: [
    { name: "You", start: "home", follow: true },
    { name: "Vishnu U R", start: "contact" },
  ],
  labelSize: 14,
  subSize: 11,
};

export const center = ({ x, y, w, h }) => ({ x: x + w / 2, y: y + h / 2 });

/** The two wall lines of a corridor between two aligned rooms. */
export const corridorWalls = (a, b, width = 18) => {
  const ca = center(a);
  const cb = center(b);
  const half = width / 2;
  if (Math.abs(ca.y - cb.y) < 1) {
    // Horizontal: from the right edge of the left room to the left edge of the right one.
    const [left, right] = ca.x < cb.x ? [a, b] : [b, a];
    const x1 = left.x + left.w;
    const x2 = right.x;
    return [
      `M${x1} ${ca.y - half} H${x2}`,
      `M${x1} ${ca.y + half} H${x2}`,
    ];
  }
  const [top, bottom] = ca.y < cb.y ? [a, b] : [b, a];
  const y1 = top.y + top.h;
  const y2 = bottom.y;
  return [
    `M${ca.x - half} ${y1} V${y2}`,
    `M${ca.x + half} ${y1} V${y2}`,
  ];
};


export const getLayout = (isMobile) => (isMobile ? mobile : desktop);
