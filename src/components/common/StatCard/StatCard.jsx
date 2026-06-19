import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

const StatCard = ({
  icon,
  iconColor = 'navy',
  label,
  value,
  trend,
  trendLabel,
  gradient = false,
  gradientFrom,
  gradientTo,
  animateCounter = true,
  className = '',
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState(animateCounter ? 0 : value);
  const cardRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!animateCounter || typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1200;
          const start = performance.now();
          const startVal = 0;

          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startVal + (value - startVal) * eased);
            setDisplayValue(current);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value, animateCounter]);

  const classNames = [
    'pu-stat-card',
    gradient && 'pu-stat-card--gradient',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = gradient
    ? {
        '--stat-gradient-from': gradientFrom || '#1a237e',
        '--stat-gradient-to': gradientTo || '#3949ab',
      }
    : {};

  return (
    <div className={classNames} ref={cardRef} style={style} {...props}>
      {icon && (
        <div className={`pu-stat-card__icon pu-stat-card__icon--${iconColor}`}>
          {icon}
        </div>
      )}
      <div className="pu-stat-card__content">
        <div className="pu-stat-card__label">{label}</div>
        <div className="pu-stat-card__value">
          {typeof displayValue === 'number'
            ? displayValue.toLocaleString()
            : displayValue}
        </div>
        {trend !== undefined && trend !== null && (
          <span
            className={`pu-stat-card__trend pu-stat-card__trend--${
              trend >= 0 ? 'up' : 'down'
            }`}
          >
            {trend >= 0 ? <TrendingUp /> : <TrendingDown />}
            {Math.abs(trend)}%{trendLabel && ` ${trendLabel}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
