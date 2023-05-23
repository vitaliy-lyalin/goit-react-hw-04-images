import React, { useEffect } from 'react';
import { ModalContent, Overlay } from './Modal.styled';
import { PropTypes } from 'prop-types';

export const Modal = ({ url, alt, hideModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      // console.log('date.now() :>> ', Date.now());
      if (e.code === 'Escape') {
        hideModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hideModal]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };
  return (
    <Overlay onClick={handleClick}>
      <ModalContent>
        <img src={url} alt={alt} />
      </ModalContent>
    </Overlay>
  );
};

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
