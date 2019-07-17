/**
 * Default values for PricingRule type
 */
export const RULE_TYPES = {
  precentage: 'precentage',
  productPrice: 'productPrice',
};

const parseNumber = (num) => Number.parseFloat(num).toFixed(2);

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

const calculatePercentageDiscount = (rule, quantity, price) => {
  const floor = Math.floor(quantity / rule.minProducts);
  // The discount amount in this case, represent the percentage, so we have to divide by 100
  return parseNumber((floor * rule.minProducts * price * rule.discountAmount) / 100);
};

const calculatePriceDiscount = (discountAmount, quantity) => parseNumber(discountAmount * quantity);

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

  calulateDiscount = (quantity, price) => {
    // if has the minimum quantity of product to apply
    if (quantity >= this.minProducts) {
      if (this.discountType === RULE_TYPES.precentage) {
        return {
          ...this,
          discountAmount: calculatePercentageDiscount(this, quantity, price),
        };
      }

      if (this.discountType === RULE_TYPES.productPrice) {
        return {
          ...this,
          discountAmount: calculatePriceDiscount(this.discountAmount, quantity),
        };
      }
      return null;
    }
    return null;
  };
}

export default PricingRule;
