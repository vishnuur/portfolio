// The four houses: their colours drive the site's accent colours once sorted
// (see styles/houses.scss), and the Sorting Hat's lines.

const HOUSES = {
  gryffindor: {
    name: "Gryffindor",
    primary: "#ae0001",
    secondary: "#eeba30",
    trait: "Plenty of courage, I see.",
  },
  slytherin: {
    name: "Slytherin",
    primary: "#1a472a",
    secondary: "#aaaaaa",
    trait: "Oh, plenty of ambition. A thirst to prove yourself…",
  },
  ravenclaw: {
    name: "Ravenclaw",
    primary: "#222f5b",
    secondary: "#946b2d",
    trait: "Not a bad mind, either. Wit beyond measure…",
  },
  hufflepuff: {
    name: "Hufflepuff",
    primary: "#ecb939",
    secondary: "#372e29",
    trait: "Loyal, patient, and unafraid of hard work.",
  },
};

export const HOUSE_KEYS = Object.keys(HOUSES);

/** Picks a house at random, preferring a different one when re-sorting. */
export const pickHouse = (current) => {
  const options = HOUSE_KEYS.filter((key) => key !== current);
  return options[Math.floor(Math.random() * options.length)];
};

export default HOUSES;
