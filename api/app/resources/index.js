/**
 * Load Resources
 */
const products = require('./products');
const discounts = require('./discounts');
const codes = require('./codes');

/**
 * Set resources into app
 */

module.exports = app => {
  // Initialize, controllers
  // models, routes, validations
  app.context.controllers = {};
  app.context.models = {};
  app.context.routes = {};
  app.context.validations = {};
  // Set resources
  products(app);
  discounts(app);
  codes(app);
};
