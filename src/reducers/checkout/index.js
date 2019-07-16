import { CHECKOUT_ACTIONS } from '../../actions/checkout/checkout';

const initialState = {
  loading: false,
  checkout: null,
};

const checkouts = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_ACTIONS.setCheckout:
      return { ...state, checkout: action.checkout };
    case CHECKOUT_ACTIONS.loading:
      return { ...state, loading: true };
    case CHECKOUT_ACTIONS.loading_end:
      return { ...state, loading: false, initialLoad: false };
    default:
      return { ...state };
  }
};

export default checkouts;
