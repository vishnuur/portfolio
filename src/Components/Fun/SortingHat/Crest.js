import React from "react";
import HOUSES from "../../../magic/houses";

/** A simple house shield with the house's initial. */
const Crest = ({ house, size = 40, className = "" }) => {
  const h = HOUSES[house];
  if (!h) return null;
  return (
    <svg
      className={`house-crest ${className}`}
      width={size}
      height={size * 1.06}
      viewBox="0 0 100 106"
      role="img"
      aria-label={`${h.name} crest`}
    >
      <path
        d="M50 4 L92 16 V52 C92 78 72 94 50 102 C28 94 8 78 8 52 V16 Z"
        fill={h.primary}
        stroke={h.secondary}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M8 40 L92 64"
        stroke={h.secondary}
        strokeWidth="5"
        opacity="0.55"
      />
      <text
        x="50"
        y="66"
        textAnchor="middle"
        fontSize="46"
        fontFamily="CustomHarryFont, Georgia, serif"
        fill={h.secondary}
        stroke={h.primary}
        strokeWidth="1.5"
      >
        {h.name[0]}
      </text>
    </svg>
  );
};

export default Crest;
