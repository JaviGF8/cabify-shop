import { validateProduct } from './Product';

/**
 *
 * @param {*} products
 */
const calculateTotal = (products) => {
  let total = 0;
  if (products && products.length) {
    products.forEach((prod) => {
      total = Number.parseFloat(total * prod.price).toFixed(2);
    });
  }
  return total;
};

/**
 *
 * @param {*} product
 */
const formatProduct = (product) => ({
  ...product,
  quantity: 0,
  total: Number.parseFloat(0).toFixed(2),
});

/**
 *
 * @param {*} amount
 * @param {*} product
 * @param {*} products
 * @param {*} total
 */
const onChange = (amount, product, products, total) => {
  const newProds = [ ...products ];
  const idx = newProds.findIndex((prd) => prd.code === product.code);
  const value = Number.parseInt(amount, 10) || 0;

  let totalItems = total;
  if (-1 < idx) {
    totalItems = (total - newProds[idx].quantity) + value;
    newProds[idx].quantity = value;
    newProds[idx].total = Number.parseFloat(value * product.price).toFixed(2);
  }

  return { products: newProds, totalItems };
};

/**
 *
 */
class Checkout {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.products = [];
    this.total = 0;
    this.totalItems = 0;
  };

  get pricingRules() { return this.pricingRules; };

  get products() { return this.products; };

  get total() { return this.total; };

  get totalItems() { return this.totalItems; };

  set pricingRules(val) { this.pricingRules = val; };

  set products(val) {
    // Check if is an array
    if (val && val.length) {
      // Check if has an invalid product
      if (val.find((prd) => !validateProduct(prd))) {
        throw new Error('Invalid products');
      }
    } else {
      // Is not an array
      throw new Error('Invalid products');
    }

    this.products = val;
  };

  /**
   *
   */
  onChangeQuantity = (amount, product) => {
    if (Number.isInteger(amount) && validateProduct(product)) {
      const { products, totalItems } = onChange(amount, product, this.products, this.totalItems);
      this.products = products;
      this.totalItems = totalItems;
      this.total = calculateTotal(this.products);
    } else {
      throw new Error('Invalid values');
    }
  };

  /**
   *
   */
  scan = (product) => {
    if (!validateProduct(product)) {
      throw new Error('Invalid product');
    }
    this.products.push(formatProduct(product));
    return this;
  };
};

export default Checkout;
