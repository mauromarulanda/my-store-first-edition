const boom = require('@hapi/boom');

function validateHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    // abortEarly es para recibir todos los errores al tiempo por parte de joi, y no uno a uno
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validateHandler;
