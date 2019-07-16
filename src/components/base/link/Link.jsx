import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { BUTTON_TYPES } from '../button/Button';

/**
 * Extends Button component
 * @param {*} param0
 */
const Link = ({ children, className, iconLeft, iconRight, inverted, text, type, ...rest }) => (
  <NavLink {...rest} className={`btn ${type}${inverted ? ' invert' : ''}${className ? ` ${className}` : ''}`}>
    {iconLeft && <i className={`${iconLeft} left`} aria-hidden="true" />}
    {text && <span>{text}</span>}
    {iconRight && <i className={`${iconRight} right`} aria-hidden="true" />}
    {children}
  </NavLink>
);

Link.defaultProps = {
  children: null,
  className: null,
  iconLeft: null,
  iconRight: null,
  inverted: false,
  text: null,
  type: BUTTON_TYPES.primary,
};

Link.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ]),
  className: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  inverted: PropTypes.bool,
  text: PropTypes.string,
  to: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES).map((type) => type)),
};

export default Link;
