/**
 *
 * @param {*} product
 */
export const validateProduct = (product) => {
  if (!product || !product.code || !product.name || !product.price || !Number.isNaN(product.price)) {
    return false;
  }
  return true;
};

/**
 *
 */
class Product {
  constructor(code, name, price) {
    if (!validateProduct({ code, name, price })) {
      throw new Error('Invalid data');
    }

    this.code = code;
    this.name = name;
    this.price = price;
  }

  get code() { return this.code; };

  get name() { return this.name; };

  get price() { return this.price; };

  set code(val) { this.code = val; };

  set name(val) { this.name = val; };

  set price(val) { this.price = val; };
};

export default Product;
