import React, { useState, useId } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Input.css';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  rows = 4,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  const inputId = props.id || id;

  const isTextarea = type === 'textarea';
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  const isFilled = value !== undefined && value !== null && value !== '';

  const wrapperClasses = [
    'pu-input-wrapper',
    error && 'pu-input-wrapper--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    isTextarea ? 'pu-textarea' : 'pu-input',
    leftIcon && 'pu-input--has-left-icon',
    (rightIcon || type === 'password') && 'pu-input--has-right-icon',
    isFilled && (isTextarea ? 'pu-textarea--filled' : 'pu-input--filled'),
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    id: inputId,
    className: inputClasses,
    value,
    onChange,
    disabled,
    placeholder: label ? ' ' : placeholder,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined,
    ...props,
  };

  return (
    <div className={wrapperClasses}>
      <div className="pu-input-field">
        {leftIcon && (
          <span className="pu-input-icon pu-input-icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {isTextarea ? (
          <textarea rows={rows} {...sharedProps} />
        ) : (
          <input type={inputType} {...sharedProps} />
        )}

        {label && (
          <label
            htmlFor={inputId}
            className={`pu-input-label ${isTextarea ? 'pu-input-label--textarea' : ''}`}
          >
            {label}
          </label>
        )}

        {type === 'password' && (
          <button
            type="button"
            className="pu-input-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}

        {rightIcon && type !== 'password' && (
          <span className="pu-input-icon pu-input-icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <span className="pu-input-error" id={`${inputId}-error`} role="alert">
          <AlertCircle size={14} />
          {error}
        </span>
      )}

      {!error && helperText && (
        <span className="pu-input-helper" id={`${inputId}-helper`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
