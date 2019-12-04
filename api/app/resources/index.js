/**
 * Load Resources
 */
const products = require('./products');

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
  // Set products resource
  products(app);
};
