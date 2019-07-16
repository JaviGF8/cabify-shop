import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cart from '../../components/shop/cart';
import Summary from '../../components/shop/summary';
import { validateProduct } from '../../models/Product';

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
    // if (!Number.isNaN(amount) && validateProduct(product)) {
    //   const { checkout } = this.state;
    //   const co = { ...checkout };

    //   const { products, totalItems } = onChange(amount, product, co.products, co.totalItems);
    //   co.products = products;
    //   co.totalItems = totalItems;
    //   co.totalPrice = calculateTotal(co.products);

    //   this.setState({ checkout: co });
    // }
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
          discounts={checkout && checkout.pricingRules}
          // totalAmount={}
          totalPrice={checkout && checkout.total && checkout.total()}
          // totalItems={}
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
