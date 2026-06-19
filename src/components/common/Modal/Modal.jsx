import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
    }, 200);
  }, [onClose]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, handleClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const overlayClasses = [
    'pu-modal-overlay',
    isClosing && 'pu-modal-overlay--closing',
  ]
    .filter(Boolean)
    .join(' ');

  const modalClasses = [
    'pu-modal',
    `pu-modal--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div
      className={overlayClasses}
      onClick={closeOnOverlay ? handleClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'pu-modal-title' : undefined}
    >
      <div
        className={modalClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="pu-modal__header">
            {title && (
              <h2 className="pu-modal__title" id="pu-modal-title">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                className="pu-modal__close"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        <div className="pu-modal__body">{children}</div>

        {footer && <div className="pu-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
