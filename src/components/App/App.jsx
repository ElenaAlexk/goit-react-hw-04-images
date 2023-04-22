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
  const [totalHits, setTotalHits] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageUrl] = useState('');

  //Виклик ф-ції після монтування. перевірка пропсів query i page//
  //componentDidUpdate(_, prevState) {
  //const { query, page } = this.state;
  //if (prevState.query !== query || prevState.page !== page) {
  //this.getSearch(query, page);
  //}
  //}

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
  //.catch(error => {
  //toast.error(`Something went wrong...`);
  //})
  //.finally(() => {
  //this.setState({ isLoading: false });
  //});
  //};

  //виклик ф-ції при натисканні на кнопку search//
  const handleFormSubmit = data => {
    if (data.query === query) {
      return;
    }
    setQuery(data.query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  //ф-ція по кліку на кнопку Load More//
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getImages(query, page);
        const { hits, totalHits } = data;
        if (hits.length === 0) {
          setTotalHits('');
          setError(
            toast.error(`Sorry, there are no images matching your search query`)
          );
          return;
        }
        setImages(prevImages => [...prevImages, hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error);
        setTotalHits('');
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

  //const {
  //page,
  //images,
  //isLoading,
  //totalHits,
  //largeImageURL,
  //alt,
  //showModal,
  //} = this.state;
  const total = totalHits / 12;
  return (
    <div className={css.App}>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery togleModal={openModal} images={images} />
      {isLoading && <Loader />}
      {!isLoading && total > page && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal onCloseModal={onCloseModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};
