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
  app.context.controllers.products = controller;
  app.context.validations.products = validations;
  app.context.models.Product = model(app.context.services.mongodbClient);
  app.context.routes.products = routes(app);
};
