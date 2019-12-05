/**
 * Module dependencies
 */
const Router = require('koa-router');

/**
 * Mount codes routes
 */
module.exports = app => {
  const router = new Router({ prefix: '/codes' });
  const routes = [
    {
      method: 'GET',
      path: '/',
      validation: app.context.validations.codes.getAll,
      controller: app.context.controllers.codes.getAll
    },
    {
      method: 'GET',
      path: '/:id',
      validation: app.context.validations.codes.getOne,
      controller: app.context.controllers.codes.getOne
    },
    {
      method: 'POST',
      path: '/',
      validation: app.context.validations.codes.create,
      controller: app.context.controllers.codes.create
    }
  ];
  const routesHelper = app.context.helpers.routes;
  routesHelper.mountApiRoutes(router, routes);
  return router;
};
