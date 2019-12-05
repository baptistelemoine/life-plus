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
  app.context.controllers.carts = controller;
  app.context.validations.carts = validations;
  app.context.models.Cart = model(app.context.services.mongodbClient);
  app.context.routes.carts = routes(app);
};
