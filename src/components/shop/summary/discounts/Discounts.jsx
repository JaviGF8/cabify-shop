import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../base/loading/Loading';

const Discounts = ({ currency, discounts, loadingRules }) => (
  <div className="summary-discounts wrapper-half border">
    {loadingRules ? (
      <Loading />
    ) : (
      <>
        <h2>Discounts</h2>
        <ul>
          {discounts.map((discount) => (
            <li key={discount.name}>
              <span>{discount.name}</span>
              <span>
                -{discount.discountAmount}
                {currency}
              </span>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
);

Discounts.defaultProps = {
  currency: '€',
  discounts: [],
  loadingRules: false,
};

Discounts.propTypes = {
  currency: PropTypes.string,
  discounts: PropTypes.array,
  loadingRules: PropTypes.bool,
};

export default Discounts;
