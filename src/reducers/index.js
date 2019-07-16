import { combineReducers } from 'redux';

import checkout from './checkout';
import pricingRules from './pricingRules';

const rootReducer = combineReducers({
  checkout,
  pricingRules,
});

export default rootReducer;
