import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  header,
  footer,
  className = '',
  onClick,
  ...props
}) => {
  const hasSections = !!(header || footer);

  const classNames = [
    'pu-card',
    `pu-card--${variant}`,
    `pu-card--padding-${hasSections ? 'none' : padding}`,
    hoverable && 'pu-card--hoverable',
    clickable && 'pu-card--clickable pu-card--hoverable',
    hasSections && 'pu-card--has-sections',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Tag = clickable ? 'div' : 'div';

  return (
    <Tag
      className={classNames}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(e);
              }
            }
          : undefined
      }
      {...props}
    >
      {header && <div className="pu-card__header">{header}</div>}
      {hasSections ? <div className="pu-card__body">{children}</div> : children}
      {footer && <div className="pu-card__footer">{footer}</div>}
    </Tag>
  );
};

export default Card;
