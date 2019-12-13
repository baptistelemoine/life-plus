/**
 * Module dependencies
 */
const boom = require('boom');
const _ = require('lodash');

/**
 * Get all carts
 */
exports.getAll = async ctx => {
  const { Cart } = ctx.models;
  const { from, to } = ctx.query;
  const fromDate = new Date(Number(from));
  const toDate = new Date(Number(to));
  let filters = {};
  if (toDate > fromDate) {
    filters = {
      createdAt: {
        $gte: new Date(Number(fromDate)),
        $lte: new Date(Number(toDate))
      }
    };
  }
  const carts = await Cart.discriminators.ValidatedCart.find(filters);
  ctx.body = carts;
};

/**
 * Get one cart
 */
exports.getOne = async ctx => {
  const { Cart, Discount } = ctx.models;
  const cart = await Cart.findById(ctx.params.id);
  if (!cart) return ctx.boom(boom.notFound());
  await cart
    .populate('discount_code')
    .populate({ path: 'products.product', populate: { path: 'discount', model: Discount } })
    .execPopulate();
  ctx.body = cart;
};

/**
 * Create cart
 */
exports.create = async ctx => {
  const { Cart } = ctx.models;
  const { body } = ctx.request;
  const cart = new Cart(body);
  await cart.save();
  ctx.status = 201;
  ctx.set('Location', `/api/carts/${cart._id}`);
  ctx.body = cart;
};

/**
 * Update cart
 */
exports.update = async ctx => {
  const { Cart, Code } = ctx.models;
  const { body } = ctx.request;
  const cart = await Cart.findById(ctx.params.id);
  if (!cart) return ctx.boom(boom.notFound());
  if (cart.type) return ctx.boom(boom.badRequest('cannot update a validated cart'));
  let code;
  let updatedCart;
  if (body.discount_code) {
    code = await Code.findOne({ code: body.discount_code });
    if (!code) return ctx.boom(boom.badRequest());
    updatedCart = Object.assign(cart, { ...body, discount_code: code._id });
  } else updatedCart = Object.assign(cart, body);
  await updatedCart.save();
  ctx.set('Location', `/api/cart/${cart._id}`);
  ctx.body = updatedCart;
};

/**
 * Validate cart
 */
exports.validate = async ctx => {
  const { Cart, Discount } = ctx.models;
  const cart = await Cart.findById(ctx.params.id);
  if (!cart) return ctx.boom(boom.notFound());
  const originalCart = await cart
    .populate('discount_code')
    .populate({ path: 'products.product', populate: { path: 'discount', model: Discount } })
    .execPopulate();
  const validatedCart = await new Cart.discriminators.ValidatedCart(
    _.omit(originalCart.toObject(), '_id')
  ).save();
  ctx.body = validatedCart;
};
