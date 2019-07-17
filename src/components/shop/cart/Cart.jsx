import React from 'react';
import PropTypes from 'prop-types';
import Table from './productsTable';
import Button, { BUTTON_TYPES } from '../../base/button/Button';
import Input from '../../base/input/Input';

import { PRODUCT_DETAIL_PATH } from '../../../utils/paths';
import Link from '../../base/link/Link';
import Loading from '../../base/loading/Loading';

const formatProduct = (name, product, setProduct) => (
  <Link
    className="product-image"
    onClick={() => setProduct(product)}
    to={{ pathname: PRODUCT_DETAIL_PATH, search: `?code=${product.code}` }}
    type={BUTTON_TYPES.transparent}>
    <img src={`../../../../public/img/${name && name.toLowerCase()}.png`} alt={name} />
    <div className="product-description">
      <h1>{name}</h1>
      <p className="product-code">Product code {product.code}</p>
    </div>
  </Link>
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
    <Input max={100} min={0} onChange={(value) => onChange(value, product)} step={1} value={quantity} />
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

const Cart = ({ currency, loading, onChange, products, setProduct }) => (
  <div className="products">
    <h1 className="main">Shopping Cart</h1>
    {loading ? (
      <Loading />
    ) : (
      <Table
        columns={[
          {
            field: 'shortName',
            formatter: (name, product) => formatProduct(name, product, setProduct),
            header: 'Product',
          },
          {
            field: 'quantity',
            formatter: (quantity, product) => formatQuantity(quantity, product, onChange),
            header: 'Quantity',
          },
          {
            field: 'price',
            formatter: (cell) => `${cell} ${currency}`,
            header: 'Price',
          },
          {
            field: 'total',
            formatter: (cell) => `${cell} ${currency}`,
            header: 'Total',
          },
        ]}
        dataKey="code"
        elements={products}
      />
    )}
  </div>
);

Cart.defaultProps = {
  currency: '€',
  loading: false,
  products: [],
};

Cart.propTypes = {
  currency: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  products: PropTypes.array,
  setProduct: PropTypes.func.isRequired,
};

export default Cart;
