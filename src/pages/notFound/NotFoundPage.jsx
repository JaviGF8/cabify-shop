import React from 'react';

import { SHOPPING_CART_PATH } from '../../utils/paths';
import Link from '../../components/base/link/Link';

const NotFoundPage = () => (
  <div id="not-found" className="container">
    <h1>Cabify Shop</h1>
    <h2>404</h2>
    <p>Sorry, page not found.</p>
    <Link className="btn primary" iconLeft="fas fa-shopping-basket" text="Return to the shop" to={SHOPPING_CART_PATH} />
  </div>
);

export default NotFoundPage;
