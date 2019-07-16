import { PRICING_RULE_ACTIONS } from '../../actions/pricingRule/pricingRule';

const initialState = {
  loading: false,
  pricingRules: null,
};

const pricingRules = (state = initialState, action) => {
  switch (action.type) {
    case PRICING_RULE_ACTIONS.setRules:
      return { ...state, pricingRules: action.pricingRules };
    case PRICING_RULE_ACTIONS.loading:
      return { ...state, loading: true };
    case PRICING_RULE_ACTIONS.loading_end:
      return { ...state, loading: false, initialLoad: false };
    default:
      return { ...state };
  }
};

export default pricingRules;
