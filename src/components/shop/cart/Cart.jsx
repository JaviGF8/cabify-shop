import React from 'react';
import PropTypes from 'prop-types';
import Table from './productsTable';
import Button, { BUTTON_TYPES } from '../../base/button/Button';
import Input from '../../base/input/Input';

const formatProduct = (name, product) => (
  <div className="product-image">
    <img src={`../../../../public/img/${name && name.toLowerCase()}.png`} alt={name} />
    <div className="product-description">
      <h1>{name}</h1>
      <p className="product-code">Product code {product.code}</p>
    </div>
  </div>
);

const formatQuantity = (quantity, product, onChange) => (
  <>
    <Button
      className="count"
      disabled={0 === quantity}
      inverted
      onClick={() => onChange(quantity - 1, product)}
      text="-"
      type={BUTTON_TYPES.transparent}
    />
    <Input
      max={100}
      min={0}
      onChange={(value) => onChange(value, product)}
      step={1}
      value={quantity}
    />
    <Button
      className="count"
      disabled={100 === quantity}
      inverted
      onClick={() => onChange(quantity + 1, product)}
      text="+"
      type={BUTTON_TYPES.transparent}
    />
  </>
);

const Cart = ({ currency, onChange, products }) => (
  <div className="products">
    <h1 className="main">Shopping Cart</h1>
    <Table
      columns={[ {
        field: 'product',
        formatter: formatProduct,
        header: 'Product',
      }, {
        field: 'quantity',
        formatter: (quantity, product) => formatQuantity(quantity, product, onChange),
        header: 'Quantity',
      }, {
        field: 'price',
        formatter: (cell) => `${cell} ${currency}`,
        header: 'Price',
      }, {
        field: 'total',
        formatter: (cell) => `${cell} ${currency}`,
        header: 'Total',
      } ]}
      dataKey="code"
      elements={products}
    />
  </div>
);

Cart.defaultProps = {
  currency: '€',
  products: [],
};

Cart.propTypes = {
  currency: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  products: PropTypes.array,
};

export default Cart;
