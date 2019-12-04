/**
 * Module dependencies
 */

const path = require('path');
const serve = require('koa-static');
const Router = require('koa-router');
const mount = require('koa-mount');

/**
 * Serve public files
 */

module.exports = () => {
  const router = new Router();
  const assetsPath = path.normalize(`${__dirname}/../../public/`);
  router.get('/assets/*', mount('/assets', serve(assetsPath, { gzip: false })));
  return router.routes();
};
