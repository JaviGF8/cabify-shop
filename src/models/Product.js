/**
 * Checks if the product is valid
 * @param {*} product
 */
export const validateProduct = (product) =>
  !(
    !product ||
    !product.code ||
    !product.name ||
    !product.price ||
    !product.productCode ||
    !product.shortName ||
    Number.isNaN(product.price)
  );

/**
 * Product Entity
 */
class Product {
  constructor(product) {
    if (!validateProduct(product)) {
      throw new Error('Invalid data');
    }
    const { code, name, price, productCode, shortName } = product;

    this.code = code;
    this.name = name;
    this.shortName = shortName;
    this.price = price;
    this.productCode = productCode;
  }
}

export default Product;
