import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return <LoadMoreButton onClick={onClick}>Load more</LoadMoreButton>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
