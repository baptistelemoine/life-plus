/**
 * Module dependencies
 */

const joi = require('joi');
const compose = require('koa-compose');
const joiValidate = require('@sigfox/koa-joi-validate');
const constants = require('./constants');
joi.objectId = require('joi-objectid')(joi);

/**
 * Get one discount validation
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
 * Create discount validation
 */
exports.create = compose([
  joiValidate({
    body: joi.object().keys({
      name: joi.string().required(),
      type: joi
        .string()
        .valid(constants.DISCOUNT_TYPES)
        .required(),
      percent: joi
        .number()
        .integer()
        .when('type', {
          is: constants.DISCOUNT_TYPES[1],
          then: joi.required()
        }),
      buy_pay: joi
        .array()
        .length(2)
        .items(joi.number().integer())
        .unique((a, b) => a < b)
        .when('type', {
          is: constants.DISCOUNT_TYPES[0],
          then: joi.required()
        })
    })
  })
]);
