/**
 * en este documento se definen las rutas
 */
const express = require('express');

const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const userRouters = require('./usersRouter');



function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1',router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', userRouters);
}

// exportamos y llamamos desde el index principal.
module.exports = routerAPI;
