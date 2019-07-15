import React from 'react';
import PropTypes from 'prop-types';

const Items = ({ currency, totalAmount, totalItems }) => (
  <ul className="summary-items wrapper border">
    <li>
      <span className="summary-items-number">{totalItems} {1 === totalItems ? 'Item' : 'Items'}</span>
      <span className="summary-items-price">{totalAmount}<span className="currency">{currency}</span></span>
    </li>
  </ul>
);

Items.defaultProps = {
  currency: '€',
  totalAmount: 0,
  totalItems: 0,
};

Items.propTypes = {
  currency: PropTypes.string,
  totalAmount: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string,
  ]),
  totalItems: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default Items;
