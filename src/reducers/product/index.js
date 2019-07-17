import { PRODUCT_ACTIONS } from '../../actions/product/product';

const initialState = {
  product: null,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ACTIONS.setProduct:
      return { ...state, product: action.product };
    default:
      return { ...state };
  }
};

export default product;
