/**
 * Module dependencies
 */

const joi = require('joi');
const compose = require('koa-compose');
const joiValidate = require('@sigfox/koa-joi-validate');
const constants = require('./constants');

joi.objectId = require('joi-objectid')(joi);

/**
 * Get one code validation
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
 * Delete one code validation
 * Make sure url params is a mongodb objectId
 */
exports.delete = compose([
  joiValidate({
    params: joi.object().keys({
      id: joi.objectId().required()
    })
  })
]);

/**
 * Create code validation
 */
exports.create = compose([
  joiValidate({
    body: joi.object().keys({
      name: joi.string().required(),
      code: joi
        .string()
        .uppercase()
        .min(6)
        .max(8)
        .required(),
      type: joi
        .string()
        .valid(constants.CODE_TYPES)
        .required(),
      value: joi
        .number()
        .integer()
        .required()
    })
  })
]);
