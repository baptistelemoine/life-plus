/**
 * Module dependencies
 */
const boom = require('boom');

/**
 * Get all carts
 */
exports.getAll = async ctx => {
  const { Cart, Discount } = ctx.models;
  const carts = await Cart.find()
    .populate('discount_code')
    .populate({ path: 'products.product', populate: { path: 'discount', model: Discount } })
    .exec();
  ctx.body = carts;
};

/**
 * Get one cart
 */
exports.getOne = async ctx => {
  const { Cart, Discount } = ctx.models;
  const cart = await Cart.findById(ctx.params.id);
  await cart
    .populate('discount_code')
    .populate({ path: 'products.product', populate: { path: 'discount', model: Discount } })
    .execPopulate();
  if (!cart) return ctx.boom(boom.notFound());
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
  const { Cart } = ctx.models;
  const { body } = ctx.request;
  const cart = await Cart.findById(ctx.params.id);
  const updatedCart = Object.assign(cart, body);
  await updatedCart.save();
  ctx.set('Location', `/api/cart/${cart._id}`);
  ctx.body = updatedCart;
};
