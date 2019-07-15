import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../base/button/Button';

const Total = ({ currency, totalPrice }) => (
  <div className="summary-total wrapper">
    <ul>
      <li>
        <span className="summary-total-cost">Total cost</span>
        <span className="summary-total-price">{totalPrice}{currency}</span>
      </li>
    </ul>
    <Button
      text="Checkout"
    />
  </div>
);

Total.defaultProps = {
  currency: '€',
  totalPrice: 0,
};

Total.propTypes = {
  currency: PropTypes.string,
  totalPrice: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default Total;
