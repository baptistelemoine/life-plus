/**
 * Module dependencies
 */
const Router = require('koa-router');

/**
 * Mount products routes
 */
module.exports = app => {
  const router = new Router({ prefix: '/products' });
  const routes = [
    {
      method: 'GET',
      path: '/',
      validation: app.context.validations.products.getAll,
      controller: app.context.controllers.products.getAll
    },
    {
      method: 'GET',
      path: '/:id',
      validation: app.context.validations.products.getOne,
      controller: app.context.controllers.products.getOne
    },
    {
      method: 'PUT',
      path: '/:id',
      validation: app.context.validations.products.update,
      controller: app.context.controllers.products.update
    },
    {
      method: 'DELETE',
      path: '/:id',
      validation: app.context.validations.products.delete,
      controller: app.context.controllers.products.delete
    },
    {
      method: 'POST',
      path: '/',
      validation: app.context.validations.products.create,
      controller: app.context.controllers.products.create
    }
  ];
  const routesHelper = app.context.helpers.routes;
  routesHelper.mountApiRoutes(router, routes);
  return router;
};
