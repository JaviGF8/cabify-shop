import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cart from '../../components/shop/cart';
import Summary from '../../components/shop/summary';

const ELEMENTS = [
  {
    code: 'X7R2OPX',
    product: 'Shirt',
    price: '20',
  }, {
    code: 'X2G2OPZ',
    product: 'Mug',
    price: '5',
  }, {
    code: 'X3W2OPY',
    product: 'Cap',
    price: '10',
  }
];

const formatProducts = (prods) => {
  if (prods && prods.length) {
    return prods.map((prod) => ({ ...prod, quantity: 0, total: Number.parseFloat(0).toFixed(2) }));
  }

  return null;
};

export default class ShoppingCartPage extends Component {
  constructor() {
    super();
    this.state = {
      products: null,
    };
  }

  componentDidMount() {
    this.setState({ products: formatProducts(ELEMENTS) });
  }

  onChangeQuantity = (val, product) => {
    const { products } = this.state;
    const newProds = [ ...products ];
    const idx = newProds.findIndex((prd) => prd.code === product.code);
    const value = Number.parseInt(val, 10) || 0;

    if (-1 < idx) {
      newProds[idx].quantity = value;
      newProds[idx].total = Number.parseFloat(value * product.price).toFixed(2);
    }
    this.setState({ products });
  }

  render() {
    const { products } = this.state;
    return (<div id="shopping-cart-container">
      <Cart
        currency="€"
        onChange={this.onChangeQuantity}
        products={products}
      />
      <Summary
        currency="€"
        // discounts={}
        // totalAmount={}
        // totalPrice={}
        // totalItems={}
      />
    </div>);
  }
}

ShoppingCartPage.defaultProps = {
  // products: [],
};

ShoppingCartPage.propTypes = {
  // products: PropTypes.array,
};
