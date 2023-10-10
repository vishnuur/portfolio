import React from "react";
import ThemeContext from "./ThemeContext";

export default function FloatingClass(extraClass = "", currentClass) {
  const { animatevalue } = React.useContext(ThemeContext);
  let value = `${animatevalue ? currentClass : ""}`;
  return extraClass + " " + value;
}
