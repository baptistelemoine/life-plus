/**
 * Mount routes
 */

module.exports = (app) => {
  Object.keys(app.context.routes).forEach((key) => {
    const router = app.context.routes[key];
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};
