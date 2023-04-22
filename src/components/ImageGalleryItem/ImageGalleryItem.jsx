import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, togleModal }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li
          key={id}
          onClick={() => {
            togleModal(largeImageURL, tags);
          }}
          className={css.GalleryItem}
        >
          <img className={css.ImageGalleryItem} src={webformatURL} alt={tags} />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
