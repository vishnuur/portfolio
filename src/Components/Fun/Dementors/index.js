import React, { useState, useEffect } from "react";
import "./index.scss";
import ThemeContext from "../../../context/ThemeContext";

const Index = () => {
  const [showImages, setShowImages] = useState(false);
  const [hideDementors, sethideDementors] = useState(false);
  const { petronaOn } = React.useContext(ThemeContext);

  const [randomPositions, setRandomPositions] = useState([]); // Store generated positions

  useEffect(() => {
    if (petronaOn) {
      setShowImages(true);
      setTimeout(() => {
        sethideDementors(true);
      }, 12000);
      setTimeout(() => {
        setShowImages(false);
      }, 20000);
    } else {
      setShowImages(false);
      sethideDementors(false);
    }
  }, [petronaOn]);

  useEffect(() => {
    // Generate random positions only once when the component mounts
    if (randomPositions.length === 0) {
      const newPositions = [];
      for (let i = 0; i < 30; i++) {
        newPositions.push(getRandomPosition());
      }
      setRandomPositions(newPositions);
    }
  }, []);

  const getRandomPosition = () => {
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);
    return { x: randomX, y: randomY };
  };

  const renderImages = () => {
    if (!showImages) return null;

    const imageArray = [];
    for (let i = 0; i < 30; i++) {
      const { x, y } = randomPositions[i]; // Use stored positions

      imageArray.push(
        <img
          key={i}
          src={require(`../../../Assets/Images/dem${(i % 3) + 1}.webp`)} // Assuming your image files are named image1.png, image2.png, and image3.png
          alt={`Dementor ${i}`}
          className={`animated-image ${
            hideDementors ? "image-all" : `image-${i % 3}`
          }`}
          style={{
            top: `${y}px`,
            left: `${x}px`,
          }}
        />
      );
    }

    return imageArray;
  };

  return (
    <div
      className="image-animation"
      style={{ zIndex: petronaOn ? "1000" : "0" }}
    >
      {renderImages()}
    </div>
  );
};

export default Index;
