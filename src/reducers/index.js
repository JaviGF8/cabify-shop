import { combineReducers } from 'redux';

import checkout from './checkout';
import pricingRules from './pricingRules';
import product from './product';

const rootReducer = combineReducers({
  checkout,
  product,
  pricingRules,
});

export default rootReducer;
