/**
 * Module dependencies
 */
const boom = require('boom');

/**
 * Get all codes
 */
exports.getAll = async ctx => {
  const { Code } = ctx.models;
  const codes = await Code.find();
  ctx.body = codes;
};

/**
 * Get one codes
 */
exports.getOne = async ctx => {
  const { Code } = ctx.models;
  const code = await Code.findById(ctx.params.id);
  if (!code) return ctx.boom(boom.notFound());
  ctx.body = code;
};

/**
 * Delete one codes
 */
exports.delete = async ctx => {
  const { Code } = ctx.models;
  const code = await Code.findById(ctx.params.id);
  if (!code) return ctx.boom(boom.notFound());
  await code.remove();
  ctx.body = 'ok';
};

/**
 * Create code
 */
exports.create = async ctx => {
  const { Code } = ctx.models;
  const { body } = ctx.request;
  const code = new Code(body);
  await code.save();
  ctx.status = 201;
  ctx.set('Location', `/api/codes/${code._id}`);
  ctx.body = code;
};

/**
 * Update code
 */
exports.update = async ctx => {
  const { Code } = ctx.models;
  const { body } = ctx.request;
  const code = await Code.findById(ctx.params.id);
  const updatedCode = Object.assign(code, body);
  await updatedCode.save();
  ctx.set('Location', `/api/codes/${code._id}`);
  ctx.body = updatedCode;
};
