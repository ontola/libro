/* eslint-disable no-console */
import HttpStatus from 'http-status-codes';

import * as errors from '../utils/errors';

const errMsg = 'Internal error escaped into userspace, please catch in the appropriate function';

/**
 * Main error handler for Argu exceptions to clients.
 * Errors other than {ArguError} instances are passed on.
 * @module
 * @param {ArguError|Error} err The error object.
 * @param {Request} req The client request object.
 * @param {Response} res The response object.
 * @param {Function} next The next error function in the middleware
 * @return {undefined}
 */
export default function errorHandlerMiddleware(err, req, res, next) {
  if (!(err instanceof errors.ArguError)) {
    next(err);
  }
  if (err.internal === true) {
    console.warn(err.devMessage);
    console.error(errMsg);
    console.debug(err.stack);
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR).end();
    return;
  }
  console.warn(err);
  if (__DEVELOPMENT__) {
    console.warn(err.devMessage);
    console.warn(err.stack);
  }
  let error;
  switch (err.status) {
    case errors.BadGatewayError.status:
    case errors.ServiceUnavailableError.status:
      error = new errors.ServiceUnavailableError();
      break;
    case errors.NotFoundError.status:
      error = new errors.NotFoundError();
      break;
    default:
      error = new errors.InternalServerErrorError();
  }
  res.sendStatus(error.status).end();
}
