/**
 *
 */
export const RULE_TYPES = {
  precentage: 'precentage',
  productPrice: 'productPrice',
};

/**
 *
 * @param {*} rule
 */
export const validateRule = (rule) => {
  if (
    !rule || !rule.productCode || !rule.name || !RULE_TYPES[rule.discountType] || !rule.discountAmount ||
    !rule.minProducts || !Number.isNaN(rule.discountAmount) || !Number.isNaN(rule.minProducts)
  ) {
    return false;
  }
  return true;
};

/**
 *
 */
class PricingRule {
  constructor(productCode, name, discountType, discountAmount, minProducts) {
    if (!validateRule(productCode, name, discountType, discountAmount, minProducts)) {
      throw new Error('Invalid data');
    }
    this.discountAmount = discountAmount;
    this.minProducts = minProducts;
    this.name = name;
    this.productCode = productCode;
  }

  get discountAmount() { return this.discountAmount; };

  get minProducts() { return this.minProducts; };

  get name() { return this.name; };

  get productCode() { return this.productCode; };

  set discountAmount(val) { this.discountAmount = val; };

  set minProducts(val) { this.minProducts = val; };

  set name(val) { this.name = val; };

  set productCode(val) { this.productCode = val; };
};

export default PricingRule;
