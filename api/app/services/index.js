/**
 * Module dependencies
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * Set authorizations
 */

module.exports = app => {
  const { config } = app.context;
  // Initiate services
  const mongodbClient = mongoose.createConnection(config.mongodb.url, config.mongodb.options);
  mongodbClient.on('error', err => console.error(err));

  // Set services
  const services = {
    mongodbClient
  };
  app.context.services = services;
};
