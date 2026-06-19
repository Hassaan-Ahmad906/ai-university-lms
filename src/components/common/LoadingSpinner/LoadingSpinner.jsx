import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({
  variant = 'spinner',
  size = 'md',
  text,
  fullPage = false,
  className = '',
  // Skeleton props
  skeletonWidth,
  skeletonHeight,
  skeletonShape = 'rect',
  ...props
}) => {
  // Skeleton variant
  if (variant === 'skeleton') {
    const skeletonClass = [
      'pu-skeleton',
      `pu-skeleton--${skeletonShape}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className={skeletonClass}
        style={{ width: skeletonWidth, height: skeletonHeight }}
        aria-hidden="true"
        {...props}
      />
    );
  }

  // Logo pulse variant
  if (variant === 'logo') {
    if (fullPage) {
      return (
        <div className="pu-loading-overlay" role="status" aria-label="Loading">
          <div className="pu-loading-logo">PU</div>
          {text && <span className="pu-loading-text">{text}</span>}
        </div>
      );
    }

    return (
      <div className={`pu-loading-inline ${className}`} role="status" aria-label="Loading" {...props}>
        <div className="pu-loading-logo" style={{ width: 48, height: 48, fontSize: '1.1rem', borderRadius: 14 }}>
          PU
        </div>
        {text && <span className="pu-loading-text">{text}</span>}
      </div>
    );
  }

  // Default spinner variant
  if (fullPage) {
    return (
      <div className="pu-loading-overlay" role="status" aria-label="Loading">
        <div className={`pu-spinner pu-spinner--lg`} />
        {text && <span className="pu-loading-text">{text}</span>}
      </div>
    );
  }

  return (
    <div className={`pu-loading-inline ${className}`} role="status" aria-label="Loading" {...props}>
      <div className={`pu-spinner pu-spinner--${size}`} />
      {text && <span className="pu-loading-text">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
