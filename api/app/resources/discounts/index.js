/**
 * Resource dependencies
 */

const routes = require('./routes');
const controller = require('./controller');
const validations = require('./validations');
const model = require('./model');

/**
 * Load resource
 */

module.exports = app => {
  app.context.controllers.discounts = controller;
  app.context.validations.discounts = validations;
  app.context.models.Discount = model(app.context.services.mongodbClient);
  app.context.routes.discounts = routes(app);
};
