/**
 * Module dependencies
 */

const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const { Schema } = mongoose;
require('mongoose-schema-jsonschema')(mongoose);

/**
 * Define User Mongodb Schema
 */
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    updatedAt: { type: Date, default: () => new Date() }
  },
  {
    timestamps: true
  }
);
productSchema.plugin(mongooseHidden);
/**
 * Create model from Schema and db
 */
module.exports = exports = db => db.model('Product', productSchema);
