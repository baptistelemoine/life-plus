/**
 * Module dependencies
 */

const joi = require('joi');
const compose = require('koa-compose');
const joiValidate = require('@sigfox/koa-joi-validate');
joi.objectId = require('joi-objectid')(joi);

/**
 * Get one product validation
 * Make sure url params is a mongodb objectId
 */
exports.getOne = compose([
  joiValidate({
    params: joi.object().keys({
      id: joi.objectId().required()
    })
  })
]);

/**
 * Update product validation
 * Make sure url params is a mongodb objectId
 */
exports.update = compose([
  joiValidate({
    params: joi.object().keys({
      id: joi.objectId().required()
    })
  })
]);

/**
 * Create product validation
 */
exports.create = compose([
  joiValidate({
    body: joi.object().keys({
      name: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required(),
      discount: joi.objectId()
    })
  })
]);

/**
 * Update product validation
 */
exports.create = compose([
  joiValidate({
    body: joi.object().keys({
      name: joi.string(),
      description: joi.string(),
      price: joi.number(),
      discount: joi.objectId()
    })
  })
]);
