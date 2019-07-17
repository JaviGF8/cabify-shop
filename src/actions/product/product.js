import productsArray from '../../models/data/Products.json';
import { setCheckout } from '../checkout/checkout';

export const PRODUCT_ACTIONS = {
  loading: 'PROD_LOADING',
  loadingEnd: 'PROD_LOADING_END',
  setProduct: 'PROD_SET_PRODUCT',
};

const loading = { type: PRODUCT_ACTIONS.loading };
const loadingEnd = { type: PRODUCT_ACTIONS.loadingEnd };

export const setProduct = (product) => (dispatch) => {
  dispatch({ type: PRODUCT_ACTIONS.setProduct, product: product && product.code ? product : null });
};

/**
 * Get the product from the code
 * @param {*} code
 */
export const getProduct = (code) => (dispatch) => {
  dispatch(loading);

  return new Promise((resolve, reject) => {
    if (code && productsArray && productsArray.length) {
      const product = productsArray.find((prd) => prd.code === code);
      dispatch(setProduct(product));
      resolve(product);
      dispatch(loadingEnd);
    } else if (!code) {
      reject(new Error('No code provided'));
      dispatch(loadingEnd);
    } else {
      reject(new Error('No product found'));
      dispatch(loadingEnd);
    }
  });
};

export const addProduct = (code) => (dispatch, getState) => {
  const { checkout } = getState().checkout;

  if (checkout) {
    const { products } = checkout;
    const product = products.find((prd) => prd.code === code);

    if (product) {
      const co = checkout.onChangeQuantity(product.quantity + 1, product);
      dispatch(setCheckout(co));
    }
  }
};
