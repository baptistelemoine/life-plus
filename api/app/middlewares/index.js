/**
 * Module dependencies
 */

/**
 * Middlewares
 */

const qs = require('koa-qs');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('@sigfox/koa-error-handler');
const boom = require('@sigfox/koa-boom');

/**
 * Mount middlewares into app
 */

exports.beforeRoutes = app => {
  // Override default koa query parser to support nesting
  // qs is not a middleware
  qs(app);
  // Body parser
  app.use(bodyParser());
  // Add ctx.boom method
  app.use(boom());
};

exports.first = app => {
  // Handle all errors
  app.use(errorHandler());
  // Log all requests
  app.use(logger());
};
