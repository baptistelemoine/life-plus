/**
 * Module dependencies
 */
const boom = require('boom');
const joiToJSONSchema = require('joi-to-json-schema');

const getJSONSchemaFromMongooseModel = Model => async ctx => {
  ctx.body = Model.schema.jsonSchema();
};

const getJSONSchemaFromJoiSchema = joiSchema => async ctx => {
  ctx.body = joiToJSONSchema(joiSchema);
};

const getJoiValidationSchemasFromRoute = route => {
  if (route.validation) {
    if (route.validation.middleware && route.validation.middleware[0]) {
      return route.validation.middleware[0].schemas;
    }
    if (route.validation.schemas) return route.validation.schemas;
  }
};

/**
 * Mount typical middlewares for api routes
 */

exports.mountApiRoutes = (router, routes, Model) => {
  if (Model) router.get('/schema', getJSONSchemaFromMongooseModel(Model));

  routes.forEach(route => {
    const middlewares = [];
    if (route.authorization && route.authorization.roles) {
      middlewares.push(route.authorization.roles);
    }
    if (route.validation) middlewares.push(route.validation);
    if (route.authorization && route.authorization.query) {
      middlewares.push(route.authorization.query);
    }
    if (route.controller) middlewares.push(route.controller);
    router[route.method.toLowerCase()](route.path, ...middlewares);

    // Mount route to expose JSON Schema for route specifying a schema prop
    const schemas = route.schema && getJoiValidationSchemasFromRoute(route);
    if (schemas) {
      const schemaMiddlewares = [];
      if (route.authorization && route.authorization.roles) {
        schemaMiddlewares.push(route.authorization.roles);
      }
      schemaMiddlewares.push(getJSONSchemaFromJoiSchema(schemas.body));
      router.get(`/schema/${route.schema}`, ...schemaMiddlewares);
    }
  });
};
