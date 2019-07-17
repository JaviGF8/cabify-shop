import React from 'react';
import PropTypes from 'prop-types';
import Items from './items';
import Discounts from './discounts';
import Total from './total';

const Summary = ({ discounts, ...rest }) => (
  <div className="summary">
    <h1 className="main">Order Summary</h1>
    <Items {...rest} />
    {discounts && 0 < discounts.length && <Discounts discounts={discounts} {...rest} />}
    <Total {...rest} />
  </div>
);

Summary.defaultProps = {
  discounts: [],
};

Summary.propTypes = {
  discounts: PropTypes.array,
};

export default Summary;
