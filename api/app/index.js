/**
 * Module dependencies
 */

const path = require('path');
const Koa = require('koa');
const superconsole = require('superconsole');
const figc = require('figc');
const cors = require('@koa/cors');

/**
 * Application dependencies
 */

const routes = require('./routes');
const resources = require('./resources');
const middlewares = require('./middlewares');
const services = require('./services');
const helpers = require('./helpers');

/**
 * Load configuration
 */

const config = figc(path.join(__dirname, '/config.json'));
config.env = process.env.NODE_ENV;
config.port = process.env.PORT || config.port;
config.logLevel = process.env.LOG_LEVEL || config.logLevel;
config.version = process.env.APP_VERSION || process.env.VERSION;
config.mongodb.url = process.env.MONGODB_URLS || config.mongodb.url;

/**
 * Setup logging
 */
if (config.env !== 'test') {
  superconsole({
    callsite: true,
    level: true,
    timestamp: true,
    logLevel: config.logLevel
  });
}

/**
 * Setup application
 */

const app = new Koa();

// Enable cors
app.use(cors());

// Print Koa app errors
app.on('error', err => console.error(err));

// Mount error handler and other middlewares
middlewares.first(app);

// Set configuration
app.context.config = config;

// Set services
services(app);

// Set helpers
helpers(app);

// Set resources including routes, validations,
// controllers, models
resources(app);

// Mount middlewares
middlewares.beforeRoutes(app);

// Mount routes
routes(app);

module.exports = app;
