import React, { useState, useEffect } from "react";
import "./index.scss";
import postcard from "../../../Assets/Images/postcard.webp";
import ThemeContext from "../../../context/ThemeContext";

const PostLettersAnimation = () => {
  const { harryTheme, postcardsactive } = React.useContext(ThemeContext);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const letterCount = 100; // Total letter count
    const maxLetterSpeed = 7;

    const createRandomLetter = () => {
      return {
        x: Math.random() * window.innerWidth,
        y: -20, // Start above the screen
        speed: Math.random() * maxLetterSpeed + 1,
      };
    };

    const moveLetters = () => {
      setLetters((prevLetters) =>
        prevLetters.map((letter) => {
          const newY = letter.y + letter.speed;
          if (newY > window.innerHeight) {
            return createRandomLetter();
          }
          return { ...letter, y: newY };
        })
      );
    };

    // Initialize letters
    const initialLetters = Array.from(
      { length: letterCount },
      createRandomLetter
    );
    setLetters(initialLetters);

    // Start animation loop
    const animationInterval = setInterval(moveLetters, 50);

    // After 30 seconds, start fading out the letters
    setTimeout(() => {
      clearInterval(animationInterval);
      setLetters((prevLetters) => {
        return prevLetters.map((letter) => {
          return { ...letter, fading: true };
        });
      });
    }, 17000);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <>
      {postcardsactive && harryTheme && (
        <div className="post-letters-container">
          {letters.map((letter, index) => (
            <img
              src={postcard}
              style={{
                position: "absolute",
                left: letter.x + "px",
                top: letter.y + "px",
                opacity: letter.fading ? 0 : 1,
              }}
              alt="postcards"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PostLettersAnimation;
