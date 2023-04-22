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



  //Виклик ф-ції після монтування. перевірка пропсів query i page//
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getSearch(query, page);
    }
  }

  getSearch = (query, page) => {
    this.setState({ isLoading: true });

    //запит на сервер//
    getImages(query, page)
      .then(res => res.json())
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          toast.error('Sorry, there are no images matching your search query.');
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits,
        }));
      })
      .catch(error => {
        toast.error(`Something went wrong...`);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  //ф-ція по кліку на кнопку Load More//
  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  //виклик ф-ції при натисканні на кнопку search//
  handleFormSubmit = query => {
    if (query === this.state.query) {
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  //відкриття та закритя модального вікна//
  openModal = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
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
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery togleModal={this.openModal} images={images} />
        {isLoading && <Loader />}
        {!isLoading && total > page && <Button onClick={handleLoadMore} />}
        {showModal && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }

