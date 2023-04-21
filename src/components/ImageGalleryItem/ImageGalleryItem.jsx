import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, togleModal }) => {
  return (
    <>
      {images.map(item => (
        <li
          key={item.id}
          onClick={event => {
            togleModal(item.largeImageURL, item.tags);
          }}
          className={css.GalleryItem}
        >
          <img
            className={css.ImageGalleryItem}
            src={item.webformatURL}
            alt={item.tags}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
