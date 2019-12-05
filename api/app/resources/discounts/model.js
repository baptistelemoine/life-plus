/**
 * Module dependencies
 */

const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });
const constants = require('./constants');

const { Schema } = mongoose;
require('mongoose-schema-jsonschema')(mongoose);

/**
 * Define User Mongodb Schema
 */
const discountSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: constants.DISCOUNT_TYPES, required: true },
    percent: { type: Number },
    buy_pay: { type: Array }
  },
  {
    timestamps: true
  }
);
discountSchema.plugin(mongooseHidden);
/**
 * Create model from Schema and db
 */
module.exports = exports = db => db.model('Discount', discountSchema);
