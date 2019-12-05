/**
 * Module dependencies
 */

const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });
const constants = require('./constants');

const { Schema } = mongoose;
require('mongoose-schema-jsonschema')(mongoose);

/**
 * Define Code Mongodb Schema
 */
const codeSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, enum: constants.CODE_TYPES, required: true },
    value: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);
codeSchema.plugin(mongooseHidden);
/**
 * Create model from Schema and db
 */
module.exports = exports = db => db.model('Code', codeSchema);
