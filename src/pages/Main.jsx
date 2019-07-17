import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// Pages
import ShoppingCartPage from '../containers/shoppingCart';
import ProductDetailPage from '../containers/productDetail';
import NotFoundPage from './notFound';

import { SHOPPING_CART_PATH, PRODUCT_DETAIL_PATH } from '../utils/paths';

export default class Main extends Component {
  componentDidMount() {
    const { initializeData } = this.props;
    initializeData();
  }

  render() {
    return (
      <main>
        <div id="main-container" className="fadein">
          <Switch>
            <Route exact path={SHOPPING_CART_PATH} component={ShoppingCartPage} />
            <Route exact path={PRODUCT_DETAIL_PATH} component={ProductDetailPage} />
            {/* 404 */}
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  initializeData: PropTypes.func.isRequired,
};
