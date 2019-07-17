import productsArray from './data/Products.json';
import Product, { validateProduct } from './Product';

const parseNumber = (num) => Number.parseFloat(num).toFixed(2);

/**
 *
 * @param {*} products
 * @param {*} appliedDiscounts
 */
const calculateTotal = (products, appliedDiscounts) => {
  let total = 0;

  if (products && products.length) {
    products.forEach((prod) => {
      if (prod.quantity) {
        total = parseNumber(Number.parseFloat(total) + prod.quantity * prod.price);
      }
    });
  }
  if (appliedDiscounts && appliedDiscounts.length) {
    appliedDiscounts.forEach((disc) => {
      total = parseNumber(Number.parseFloat(total) - disc.discountAmount);
    });
  }

  return total;
};

/**
 *
 * @param {*} products
 */
const calculateDiscounts = (products, pricingRules) => {
  const discounts = [];
  let discountAmount = 0;

  if (products && products.length && pricingRules && pricingRules.length) {
    let productPRs = null;
    products.forEach((prod) => {
      // Get all the pricing rules of the product
      productPRs = pricingRules.filter((pr) => pr.productCode === prod.code);

      if (productPRs.length) {
        let discount = null;
        productPRs.forEach((ppr) => {
          // calculate if has a discount
          discount = ppr.calulateDiscount(prod.quantity, prod.price);

          if (discount) {
            discountAmount = parseNumber(
              Number.parseFloat(discountAmount) + Number.parseFloat(discount.discountAmount),
            );
            discounts.push(discount);
          }
        });
      }
    });
  }

  return { discounts, discountAmount };
};

/**
 *
 * @param {*} product
 */
const formatProduct = (product) => ({
  ...product,
  quantity: 0,
  total: parseNumber(0),
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
    prodEditing.total = parseNumber(value * product.price);

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
    this.totalWithoutDisc = 0;
  }

  /**
   *
   */
  onChangeQuantity = (amount, product) => {
    if (Number.isInteger(amount) && validateProduct(product)) {
      const { products, totalItems } = onChange(amount, product, this.products, this.totalItems);

      this.products = products;
      this.totalItems = totalItems;
      const { discounts, discountAmount } = calculateDiscounts(this.products, this.pricingRules);
      this.appliedDiscounts = discounts;
      this.totalPrice = calculateTotal(this.products, this.appliedDiscounts);
      this.totalWithoutDisc = parseNumber(Number.parseFloat(discountAmount) + Number.parseFloat(this.totalPrice));
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
