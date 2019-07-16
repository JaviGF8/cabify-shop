import pricingRulesArray from '../../models/data/PricingRules.json';
import PricingRule, { validatePricingRule } from '../../models/PricingRule';

export const PRICING_RULE_ACTIONS = {
  loading: 'PR_LOADING',
  loadingEnd: 'PR_LOADING_END',
  setRules: 'PR_SET_RULES',
};

const loading = { type: PRICING_RULE_ACTIONS.loading };
const loadingEnd = { type: PRICING_RULE_ACTIONS.loadingEnd };

export const initializePricingRules = () => (dispatch) => {
  dispatch(loading);
  return new Promise((resolve, reject) => {
    const pricingRules = [];

    if (pricingRulesArray && pricingRulesArray.length) {
      pricingRulesArray.forEach((pricingRule) => {
        // If pricingRules are valid, push them initialized to the array. If not, there's an error.
        if (validatePricingRule(pricingRule)) {
          pricingRules.push(new PricingRule(pricingRule));
        } else {
          reject(new Error('Invalid pricingRules'));
        }
      });
    }

    dispatch({ type: PRICING_RULE_ACTIONS.setRules, pricingRules });
    resolve(pricingRules);
    dispatch(loadingEnd);
  });
};
