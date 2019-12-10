/**
 * Module dependencies
 */

const joi = require('joi');
const compose = require('koa-compose');
const joiValidate = require('@sigfox/koa-joi-validate');

joi.objectId = require('joi-objectid')(joi);

/**
 * Get one cart validation
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
 * Create cart validation
 */
exports.create = compose([
  joiValidate({
    body: joi.object().keys({
      products: joi.array().items(
        joi.object().keys({
          product: joi.objectId(),
          quantity: joi.number().integer()
        })
      ),
      discount_code: joi.string().allow(null)
    })
  })
]);

/**
 * Update cart validation
 */
exports.update = compose([
  joiValidate({
    body: joi.object().keys({
      products: joi.array().items(
        joi.object().keys({
          product: joi.objectId(),
          quantity: joi.number().integer()
        })
      ),
      discount_code: joi.string().allow(null)
    })
  })
]);
