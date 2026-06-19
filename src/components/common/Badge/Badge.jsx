import React from 'react';
import './Badge.css';

const Badge = ({
  children,
  variant = 'default',
  dot = false,
  pulse = false,
  className = '',
  ...props
}) => {
  const classNames = [
    'pu-badge',
    `pu-badge--${variant}`,
    pulse && 'pu-badge--pulse',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {dot && <span className="pu-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Badge;
