import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { PropTypes } from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  onGalleryItemClick,
}) => (
  <GalleryItem onClick={onGalleryItemClick}>
    <Image src={webformatURL} alt={tags} />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onGalleryItemClick: PropTypes.func.isRequired,
};
