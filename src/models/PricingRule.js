/**
 * Default values for PricingRule type
 */
export const RULE_TYPES = {
  precentage: 'precentage',
  productPrice: 'productPrice',
};

/**
 * Checks if the Pricing rule is valid
 * @param {*} pricingRule
 */
export const validatePricingRule = (pricingRule) =>
  !(
    !pricingRule ||
    !pricingRule.productCode ||
    !pricingRule.name ||
    !RULE_TYPES[pricingRule.discountType] ||
    !pricingRule.discountAmount ||
    !pricingRule.minProducts ||
    Number.isNaN(pricingRule.discountAmount) ||
    Number.isNaN(pricingRule.minProducts)
  );

/**
 * Pricing rule entity
 */
class PricingRule {
  constructor(pricingRule) {
    if (!validatePricingRule(pricingRule)) {
      throw new Error('Invalid data');
    }
    const { productCode, name, discountType, discountAmount, minProducts } = pricingRule;
    this.discountAmount = discountAmount;
    this.discountType = discountType;
    this.minProducts = minProducts;
    this.name = name;
    this.productCode = productCode;
  }
}

export default PricingRule;
