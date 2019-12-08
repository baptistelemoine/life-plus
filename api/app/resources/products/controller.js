/**
 * Module dependencies
 */
const boom = require('boom');

/**
 * Get all products
 */
exports.getAll = async ctx => {
  const { Product } = ctx.models;
  const products = await Product.find()
    .populate('discount')
    .exec();
  ctx.body = products;
};

/**
 * Get one product
 */
exports.getOne = async ctx => {
  const { Product } = ctx.models;
  const product = await Product.findById(ctx.params.id);
  await product.populate('discount').execPopulate();
  if (!product) return ctx.boom(boom.notFound());
  ctx.body = product;
};

/**
 * Create product
 */
exports.create = async ctx => {
  const { Product } = ctx.models;
  const { body } = ctx.request;
  const product = new Product(body);
  await product.save();
  ctx.status = 201;
  ctx.set('Location', `/api/products/${product._id}`);
  ctx.body = product;
};

/**
 * Update product
 */
exports.update = async ctx => {
  const { Product } = ctx.models;
  const { body } = ctx.request;
  const product = await Product.findById(ctx.params.id);
  const updatedProduct = Object.assign(product, body);
  await updatedProduct.save();
  ctx.set('Location', `/api/products/${product._id}`);
  ctx.body = updatedProduct;
};

/**
 * Delete product
 */
exports.delete = async ctx => {
  const { Product } = ctx.models;
  const product = await Product.findById(ctx.params.id);
  if (!product) return ctx.boom(boom.notFound());
  await product.remove();
  ctx.body = 'ok';
};
