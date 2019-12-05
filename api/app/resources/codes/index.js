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
  app.context.controllers.codes = controller;
  app.context.validations.codes = validations;
  app.context.models.Code = model(app.context.services.mongodbClient);
  app.context.routes.codes = routes(app);
};
