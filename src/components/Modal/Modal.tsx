import type React from 'react';
import styled from './Modal.module.css';
import { useEffect, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleClickBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={styled.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleClickBackdrop}
    >
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
