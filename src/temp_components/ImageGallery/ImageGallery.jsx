import React from "react";
import ImageCard from "./ImageCard/imageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} onClick={() => onImageClick && onImageClick(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
