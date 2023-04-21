import React, { Component } from 'react';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../../services/getImages';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    page: 1,
    totalHits: '',
    error: null,
    showModal: false,
  };

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
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      page,
      images,
      isLoading,
      totalHits,
      largeImageURL,
      alt,
      showModal,
    } = this.state;
    const total = totalHits / 12;
    return (
      <div className={css.App}>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery togleModal={this.openModal} images={images} />
        {isLoading && <Loader />}
        {!isLoading && total > page && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}
