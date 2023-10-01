import React, { useState } from 'react';
import './Slider.css';

const ImageSlider = ({ images }) => {
  const [currentImage, setCurrentImageIndex] = useState(0);

  const toPreviousImage = () => {
    setCurrentImageIndex((previousIndex) =>
      previousIndex === 0 ? images.length - 1 : previousIndex - 1
    );
  };

  const toNextImage = () => {
    setCurrentImageIndex((previousIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-slider">
      <button onClick={toPreviousImage} className="slider-button">
        &lt;
      </button>
      <img
        src={images[currentImage]}
        alt={`Image ${currentImage + 1}`}
        className="slider-image"
      />
      <button onClick={toNextImage} className="slider-button">
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;
