import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onCloseModal, children }) => {
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
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};
