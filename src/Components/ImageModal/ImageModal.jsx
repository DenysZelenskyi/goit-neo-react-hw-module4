import React, { useEffect } from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root"); // Указываем корневой элемент приложения

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.overlay}
    >
      <div className={styles.imageContainer}>
        <img src={image.urls.regular} alt={image.alt_description} />
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
