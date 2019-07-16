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

const Button = ({ children, className, iconLeft, iconRight, inverted, text, type, ...rest }) => (
  <button
    {...rest}
    type="button"
    className={`btn ${type}${inverted ? ' invert' : ''}${className ? ` ${className}` : ''}`}>
    {iconLeft && <i className={`${iconLeft} left`} aria-hidden="true" />}
    {text && <span>{text}</span>}
    {iconRight && <i className={`${iconRight} right`} aria-hidden="true" />}
    {children}
  </button>
);

Button.defaultProps = {
  children: null,
  className: null,
  iconLeft: null,
  iconRight: null,
  inverted: false,
  text: null,
  type: BUTTON_TYPES.primary,
};

Button.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ]),
  className: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  inverted: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES).map((type) => type)),
};

export default Button;
