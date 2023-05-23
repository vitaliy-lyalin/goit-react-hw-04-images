import { ErrorPageWrapper } from './ErrorPage.styled';
import { PropTypes } from 'prop-types';

export const ErrorPage = ({ text }) => {
  return <ErrorPageWrapper>{text}</ErrorPageWrapper>;
};

ErrorPage.propTypes = {
  text: PropTypes.string.isRequired,
};
