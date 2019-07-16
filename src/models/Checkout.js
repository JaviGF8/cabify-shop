import productsArray from './data/Products.json';
import Product, { validateProduct } from './Product';

/**
 *
 * @param {*} products
 */
const calculateTotal = (products) => {
  let total = 0;
  if (products && products.length) {
    products.forEach((prod) => {
      total = Number.parseFloat(Number.parseFloat(total) + prod.quantity * prod.price).toFixed(2);
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
    const prodEditing = { ...product };

    totalItems = total - prodEditing.quantity + value;
    prodEditing.quantity = value;
    prodEditing.total = Number.parseFloat(value * product.price).toFixed(2);

    newProds[idx] = prodEditing;
  }

  return { products: newProds, totalItems };
};

/**
 * Checkout class
 */
class Checkout {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.products = [];
    this.appliedDiscounts = [];
    this.totalPrice = 0;
    this.totalItems = 0;
  }

  /**
   *
   */
  onChangeQuantity = (amount, product) => {
    if (Number.isInteger(amount) && validateProduct(product)) {
      const { products, totalItems } = onChange(amount, product, this.products, this.totalItems);

      this.products = products;
      this.totalItems = totalItems;
      this.totalPrice = calculateTotal(this.products);
      return this;
    }
    throw new Error('Invalid values');
  };

  scan = (productCode) => {
    // Search the product in the array
    const product = productsArray.find((prd) => prd.code === productCode);

    if (!product || !validateProduct(product)) {
      // invalid product
      throw new Error('Invalid product');
    } else {
      // product found
      this.products.push(formatProduct(new Product(product)));
      return this;
    }
  };

  total = () => this.totalPrice;
}

export default Checkout;
