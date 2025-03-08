import "./App.css";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./api/unsplash";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetching = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchImages(query, page);
        console.log("Загруженные изображения:", res);
        setImages((prevImages) => (page === 1 ? res : [...prevImages, ...res]));
      } catch (error) {
        setError("Помилка завантаження зображень. Спробуйте ще раз!");
      } finally {
        setLoading(false);
      }
    };

    fetching();
  }, [query, page]);

  const handleImageClick = (image) => {
    if (!image) return;
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar
        onSubmit={(newQuery) => {
          setQuery(newQuery);
          setPage(1);
          setImages([]);
        }}
      />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage(page + 1)} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
