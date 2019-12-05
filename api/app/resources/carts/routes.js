/**
 * Module dependencies
 */
const Router = require('koa-router');

/**
 * Mount carts routes
 */
module.exports = app => {
  const router = new Router({ prefix: '/carts' });
  const routes = [
    {
      method: 'GET',
      path: '/',
      validation: app.context.validations.carts.getAll,
      controller: app.context.controllers.carts.getAll
    },
    {
      method: 'GET',
      path: '/:id',
      validation: app.context.validations.carts.getOne,
      controller: app.context.controllers.carts.getOne
    },
    {
      method: 'POST',
      path: '/',
      validation: app.context.validations.carts.create,
      controller: app.context.controllers.carts.create
    },
    {
      method: 'PUT',
      path: '/:id',
      // validation: app.context.validations.carts.update,
      controller: app.context.controllers.carts.update
    }
  ];
  const routesHelper = app.context.helpers.routes;
  routesHelper.mountApiRoutes(router, routes);
  return router;
};
