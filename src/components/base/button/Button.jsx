import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const BUTTON_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
  gray: 'gray',
  black: 'black',
  transparent: 'transparent',
};

const Button = ({ children, className, disabled, iconLeft, iconRight, inverted, onClick, text, type }) => (
  <button
    type="button"
    disabled={disabled}
    className={`btn ${type}${inverted ? ' invert' : ''}${className ? ` ${className}` : ''}`}
    onClick={onClick}>
    {iconLeft && <i className={`${iconLeft} left`} aria-hidden="true" />}
    {text && <span>{text}</span>}
    {iconRight && <i className={`${iconRight} right`} aria-hidden="true" />}
    {children}
  </button>
);

Button.defaultProps = {
  children: null,
  className: null,
  disabled: false,
  iconLeft: null,
  iconRight: null,
  inverted: false,
  onClick: () => true,
  text: null,
  type: BUTTON_TYPES.primary,
};

Button.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ]),
  className: PropTypes.string,
  disabled: PropTypes.any,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES).map((type) => type)),
};

export default Button;
