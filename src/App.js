import { useState, useEffect } from 'react';
import styled from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import Pixabay from './services/Pixabay';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from 'react-loader-spinner';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = ({ query }) => {
    setQuery(query);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const getImagesFromPixabay = async () => {
      setIsLoading(true);
      const response = await Pixabay.getImages(query, page);
      setImages(prevState => [...prevState, ...response]);
      setIsLoading(false);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };
    getImagesFromPixabay();
  }, [query, page]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const onLoadMore = () => {
    setPage(prevState => ++prevState);
  };

  const onModalOpen = event => {
    const id = event.currentTarget.id;
    const currentItem = images.find(elem => elem.id === parseInt(id, 10));
    setIsModal(true);
    setCurrentItem(currentItem);
  };

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      setIsModal(false);
    }
  };

  const closeModal = event => {
    if (event.currentTarget === event.target) {
      setIsModal(false);
    }
  };

  return (
    <div className={styled.App}>
      <Searchbar onSubmit={formSubmit} />
      <ImageGallery images={images} onModalOpen={onModalOpen} />
      {isModal && <Modal item={currentItem} onClose={closeModal} />}
      {images.length > 1 && <Button onClick={onLoadMore} />}
      {isLoading && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}
    </div>
  );
}

export default App;
