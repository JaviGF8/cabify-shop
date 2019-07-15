import React from 'react';
import PropTypes from 'prop-types';

const Discounts = ({ currency, discounts }) => (
  <div className="summary-discounts wrapper-half border">
    <h2>Discounts</h2>
    <ul>
      {discounts.map((discount) => (
        <li key={discount.name}>
          <span>{discount.name}</span>
          <span>-{discount.amount}{currency}</span>
        </li>
      ))}
    </ul>
  </div>
);

Discounts.defaultProps = {
  currency: '€',
  discounts: [],
};

Discounts.propTypes = {
  currency: PropTypes.string,
  discounts: PropTypes.array,
};

export default Discounts;
