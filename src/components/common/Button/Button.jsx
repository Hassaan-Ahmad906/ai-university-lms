import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  type = 'button',
  className = '',
  onClick,
  ...props
}) => {
  const classNames = [
    'pu-btn',
    `pu-btn--${variant}`,
    `pu-btn--${size}`,
    fullWidth && 'pu-btn--full',
    loading && 'pu-btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="pu-btn__spinner" aria-hidden="true" />}
      {!loading && leftIcon && (
        <span className="pu-btn__icon pu-btn__icon--left" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className="pu-btn__label">{children}</span>
      {!loading && rightIcon && (
        <span className="pu-btn__icon pu-btn__icon--right" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
