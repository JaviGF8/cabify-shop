import Checkout from '../../models/Checkout';
import productsArray from '../../models/data/Products.json';

export const CHECKOUT_ACTIONS = {
  loading: 'CO_LOADING',
  loadingEnd: 'CO_LOADING_END',
  setCheckout: 'CO_SET_CHEKCOUT',
};

const loading = { type: CHECKOUT_ACTIONS.loading };
const loadingEnd = { type: CHECKOUT_ACTIONS.loadingEnd };

export const initializeCheckout = () => (dispatch, getState) => {
  dispatch(loading);
  return new Promise((resolve) => {
    const { pricingRules } = getState().pricingRules;

    let co = new Checkout(pricingRules);

    if (productsArray && productsArray.length) {
      // Scan every product
      productsArray.forEach((prd) => {
        co = co.scan(prd.code);
      });
    }

    dispatch({ type: CHECKOUT_ACTIONS.setCheckout, checkout: co });
    resolve(co);
    dispatch(loadingEnd);
  });
};
