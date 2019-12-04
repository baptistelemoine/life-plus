/**
 * Helpers dependencies
 */

const routes = require('./routes');

/**
 * Load helpers
 */

module.exports = (app) => {
  app.context.helpers = {
    routes
  };
};
