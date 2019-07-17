import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../../components/base/link/Link';
import { SHOPPING_CART_PATH } from '../../utils/paths';
import { BUTTON_TYPES } from '../../components/base/button/Button';
import Loading from '../../components/base/loading/Loading';

const getCode = () => {
  const { search } = window.location;

  const array = search.split('=');

  if (array && 1 < array.length && '?code' === array[0]) {
    return array[1];
  }
  return null;
};

export default class ProductDetailPage extends Component {
  componentDidMount() {
    const { getProduct, product } = this.props;
    const code = getCode();
    if (!product && code) {
      getProduct(code);
    }
  }

  render() {
    const { addProduct, currency, loadingProduct, product, setProduct } = this.props;

    return (
      <div id="product-detail" className="container">
        {loadingProduct ? (
          <Loading />
        ) : (
          <img
            src={product && product.shortName && `../../../public/img/${product.shortName.toLowerCase()}.png`}
            alt={(product && product.shortName) || 'product'}
          />
        )}
        <div className="summary">
          <Link
            className="back-btn"
            iconLeft="fas fa-times"
            onClick={setProduct}
            to={SHOPPING_CART_PATH}
            type={BUTTON_TYPES.transparent}
          />
          {!product || loadingProduct ? (
            <Loading />
          ) : (
            <div className="product-detail">
              <div className="header">
                <h1>{product.shortName}</h1>
                <h1>
                  {product.price} {currency}
                </h1>
              </div>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="code">Product code {product.productCode}</p>
              <Link onClick={() => addProduct(product.code)} text="Add to cart" to={SHOPPING_CART_PATH} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

ProductDetailPage.defaultProps = {
  currency: '€',
  loadingProduct: false,
  product: null,
};

ProductDetailPage.propTypes = {
  addProduct: PropTypes.func.isRequired,
  currency: PropTypes.string,
  getProduct: PropTypes.func.isRequired,
  loadingProduct: PropTypes.bool,
  product: PropTypes.object,
  setProduct: PropTypes.func.isRequired,
};
