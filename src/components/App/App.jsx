import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../../services/getImages';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageUrl] = useState('');

  //getSearch = (query, page) => {
  //this.setState({ isLoading: true });

  //запит на сервер//
  //getImages(query, page)
  //.then(res => res.json())
  //.then(({ hits, totalHits }) => {
  //if (totalHits === 0) {
  //toast.error('Sorry, there are no images matching your search query.');
  //}
  //this.setState(prevState => ({
  //images: [...prevState.images, ...hits],
  //totalHits,
  //}));
  //})

  //виклик ф-ції при натисканні на кнопку search//
  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  //ф-ція по кліку на кнопку Load More//
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query === '') return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getImages(query, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setLastPage(Math.ceil(response.totalHits / 12));
        response.totalHits === 0 &&
          toast.error(`Sorry, there are no images matching your search query`);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  //відкриття та закритя модального вікна//
  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageUrl(largeImageURL);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.App}>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p>Something went wrong: {error.message}</p>}
      <ImageGallery togleModal={openModal} images={images} />
      {isLoading && <Loader />}
      {!isLoading && page < lastPage && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal onCloseModal={onCloseModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};
