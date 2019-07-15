import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { BUTTON_TYPES } from '../button/Button';

const Link = ({ children, className, disabled, iconLeft, iconRight, inverted, onClick, text, type, to }) => (
  <NavLink
    disabled={disabled}
    className={`btn ${type}${inverted ? ' invert' : ''}${className ? ` ${className}` : ''}`}
    onClick={onClick}
    to={to}>
    {iconLeft && <i className={`${iconLeft} left`} aria-hidden="true" />}
    {text && <span>{text}</span>}
    {iconRight && <i className={`${iconRight} right`} aria-hidden="true" />}
    {children}
  </NavLink>
);

Link.defaultProps = {
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

Link.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ]),
  className: PropTypes.string,
  disabled: PropTypes.any,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  to: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES).map((type) => type)),
};

export default Link;
