import React from 'react';
import PropTypes from 'prop-types';
import Items from './items';
import Discounts from './discounts';
import Total from './total';

const Summary = ({ currency, discounts, totalAmount, totalItems, totalPrice }) => (
  <div className="summary">
    <h1 className="main">Order Summary</h1>
    {<Items
      currency={currency}
      totalAmount={totalAmount}
      totalItems={totalItems}
    />}
    {discounts && 0 < discounts.length && <Discounts
      currency={currency}
      discounts={discounts}
    />}
    {<Total
      currency={currency}
      totalPrice={totalPrice}
    />}
  </div>
);

Summary.defaultProps = {
  currency: '€',
  discounts: [],
  totalAmount: 0,
  totalPrice: 0,
  totalItems: 0,
};

Summary.propTypes = {
  currency: PropTypes.string,
  discounts: PropTypes.array,
  totalAmount: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string,
  ]),
  totalPrice: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string,
  ]),
  totalItems: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default Summary;
