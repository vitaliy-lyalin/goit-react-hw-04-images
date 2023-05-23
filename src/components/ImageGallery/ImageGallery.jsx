import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { PropTypes } from 'prop-types';

export const ImageGallery = ({ gallery, showModal }) => {
  // console.log(gallery);
  return (
    <ImageGalleryList>
      {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onGalleryItemClick={() => {
            showModal(largeImageURL, tags);
          }}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  showModal: PropTypes.func.isRequired,
};
