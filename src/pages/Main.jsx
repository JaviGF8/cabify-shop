import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import ShoppingCartPage from '../containers/shoppingCart';
import NotFoundPage from './notFound';

import { SHOPPING_CART_PATH } from '../utils/paths';

export default class Main extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <main>
        <div id="main-container" className="fadein">
          <Switch>
            <Route exact path={SHOPPING_CART_PATH} component={ShoppingCartPage} />
            {/* 404 */}
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </main>
    );
  }
}

Main.defaultProps = {
};

Main.propTypes = {
};
