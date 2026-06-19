import React from 'react';
import './Avatar.css';

const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  className = '',
  ...props
}) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const classNames = ['pu-avatar', `pu-avatar--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} aria-label={name || alt} role="img" {...props}>
      {src ? (
        <img className="pu-avatar__image" src={src} alt={alt || name} />
      ) : (
        getInitials(name)
      )}
      {status && (
        <span
          className={`pu-avatar__status pu-avatar__status--${status}`}
          aria-label={status}
        />
      )}
    </div>
  );
};

export default Avatar;
