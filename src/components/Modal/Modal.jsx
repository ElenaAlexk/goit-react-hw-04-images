import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onCloseModal, imageUrl, tags }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseModal]);

  const handleClose = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div onClick={handleClose} className={css.Overlay}>
      <img className={css.Modal} src={imageUrl} alt={tags} />
    </div>,
    modalRoot
  );
};
