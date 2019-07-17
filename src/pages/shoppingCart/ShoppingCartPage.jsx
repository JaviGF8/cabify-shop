import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cart from '../../components/shop/cart';
import Summary from '../../components/shop/summary';

export default class ShoppingCartPage extends Component {
  constructor() {
    super();
    this.state = {
      checkout: null,
    };
  }

  componentDidMount() {
    const { initializeData } = this.props;
    initializeData();
  }

  componentDidUpdate(prevProps) {
    const { checkout } = this.props;
    if (!prevProps.checkout && checkout) {
      this.setState({ checkout });
    }
  }

  onChangeQuantity = (amount, product) => {
    const { checkout } = this.state;

    const co = checkout.onChangeQuantity(amount, product);

    this.setState({ checkout: co });
  };

  render() {
    const { checkout } = this.state;
    return (
      <div id="shopping-cart-container">
        <Cart
          currency="€"
          onChange={this.onChangeQuantity}
          products={checkout && checkout.products && checkout.products}
        />
        <Summary
          currency="€"
          discounts={checkout && checkout.appliedDiscounts}
          totalAmount={checkout && checkout.totalWithoutDisc}
          totalPrice={checkout && checkout.total && checkout.total()}
          totalItems={checkout && checkout.totalItems}
        />
      </div>
    );
  }
}

ShoppingCartPage.defaultProps = {
  checkout: null,
  // products: [],
};

ShoppingCartPage.propTypes = {
  checkout: PropTypes.object,
  initializeData: PropTypes.func.isRequired,
  // products: PropTypes.array,
};
