/**
 * Module dependencies
 */
const Router = require('koa-router');

/**
 * Mount discounts routes
 */
module.exports = app => {
  const router = new Router({ prefix: '/discounts' });
  const routes = [
    {
      method: 'GET',
      path: '/',
      validation: app.context.validations.discounts.getAll,
      controller: app.context.controllers.discounts.getAll
    },
    {
      method: 'GET',
      path: '/:id',
      validation: app.context.validations.discounts.getOne,
      controller: app.context.controllers.discounts.getOne
    },
    {
      method: 'DELETE',
      path: '/:id',
      validation: app.context.validations.discounts.delete,
      controller: app.context.controllers.discounts.delete
    },
    {
      method: 'POST',
      path: '/',
      validation: app.context.validations.discounts.create,
      controller: app.context.controllers.discounts.create
    }
  ];
  const routesHelper = app.context.helpers.routes;
  routesHelper.mountApiRoutes(router, routes);
  return router;
};
