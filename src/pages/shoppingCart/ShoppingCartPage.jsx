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
    const { checkout } = this.props;
    if (checkout) {
      this.setState({ checkout });
    }
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
    const { loadingCheckout, loadingRules, setProduct } = this.props;
    return (
      <div className="container">
        <Cart
          currency="€"
          loading={loadingCheckout}
          onChange={this.onChangeQuantity}
          products={checkout && checkout.products && checkout.products}
          setProduct={setProduct}
        />
        <Summary
          currency="€"
          discounts={checkout && checkout.appliedDiscounts}
          loadingRules={loadingRules}
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
  loadingCheckout: false,
  loadingRules: false,
};

ShoppingCartPage.propTypes = {
  checkout: PropTypes.object,
  loadingCheckout: PropTypes.bool,
  loadingRules: PropTypes.bool,
  setProduct: PropTypes.func.isRequired,
};
