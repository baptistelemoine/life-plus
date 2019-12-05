/**
 * Module dependencies
 */
const boom = require('boom');

/**
 * Get all discount
 */
exports.getAll = async ctx => {
  const { Discount } = ctx.models;
  const discounts = await Discount.find();
  ctx.body = discounts;
};

/**
 * Get one discount
 */
exports.getOne = async ctx => {
  const { Discount } = ctx.models;
  const discount = await Discount.findById(ctx.params.id);
  if (!discount) return ctx.boom(boom.notFound());
  ctx.body = discount;
};

/**
 * Create discount
 */
exports.create = async ctx => {
  const { Discount } = ctx.models;
  const { body } = ctx.request;
  const discount = new Discount(body);
  await discount.save();
  ctx.status = 201;
  ctx.set('Location', `/api/products/${discount._id}`);
  ctx.body = discount;
};
