import { initializePricingRules } from '../pricingRule/pricingRule';
import { initializeCheckout } from '../checkout/checkout';

export const initializeData = () => (dispatch) => {
  // When rules are initialized, then we initialize the checkout
  dispatch(initializePricingRules()).then(() => {
    dispatch(initializeCheckout());
  });
};

export const a = () => {};
