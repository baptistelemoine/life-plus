/**
 * Module dependencies
 */

const http = require('http');

/**
 * Load app
 */

const app = require('./app/');

/**
 * Setup HTTP server
 */

const server = http.createServer(app.callback());
server.listen(app.context.config.port, err => {
  if (err) return console.error(err);
  console.info(`Server is listening on port ${app.context.config.port}`);
  console.info(`Using configuration: ${JSON.stringify(app.context.config)}`);
});
