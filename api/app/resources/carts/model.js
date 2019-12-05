/**
 * Module dependencies
 */

const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });
const discountConstants = require('../discounts/constants');
const codeConstants = require('../codes/constants');

const { Schema } = mongoose;
require('mongoose-schema-jsonschema')(mongoose);

const productsSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

// eslint-disable-next-line
productsSchema.virtual('total').get(function() {
  if (this.product.discount) {
    const buyPayDiscount = discountConstants.DISCOUNT_TYPES[0];
    const percentDiscount = discountConstants.DISCOUNT_TYPES[1];
    if (this.product.discount.type === buyPayDiscount) {
      return (
        Math.ceil(
          (this.quantity / this.product.discount[buyPayDiscount][0]) *
            this.product.discount[buyPayDiscount][1]
        ) * this.product.price
      );
    }
    if (this.product.discount.type === percentDiscount) {
      const updatedPrice =
        this.product.price - this.product.price * (this.product.discount[percentDiscount] / 100);
      return this.quantity * updatedPrice;
    }
  }
  return this.quantity * this.product.price;
});

/**
 * Define Cart Mongodb Schema
 */
const cartSchema = new Schema(
  {
    products: [productsSchema],
    discount_code: { type: Schema.Types.ObjectId, ref: 'Code' }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
cartSchema.plugin(mongooseHidden);

/**
 * Calculate total cart amount
 */
// eslint-disable-next-line
cartSchema.virtual('total').get(function() {
  const beforeDiscountCode = this.products.reduce((a, b) => a + b.total, 0);
  if (this.discount_code) {
    const fixedDiscount = codeConstants.CODE_TYPES[0];
    const percentDiscount = codeConstants.CODE_TYPES[1];
    if (this.discount_code.type === percentDiscount) {
      return beforeDiscountCode - beforeDiscountCode * (this.discount_code.value / 100);
    }
    if (this.discount_code.type === fixedDiscount) {
      return beforeDiscountCode - this.discount_code.value;
    }
  }
  return beforeDiscountCode;
});

/**
 * Create model from Schema and db
 */
module.exports = exports = db => db.model('Cart', cartSchema);
