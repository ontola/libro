/* eslint-disable no-console */
import HttpStatus from 'http-status-codes';

import * as errors from '../utils/errors';
import logging from '../utils/logging';

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
export default async function backendErrorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (!(err instanceof errors.ArguError)) {
      throw err;
    }

    ctx.bugsnag.notify(err, {
      request: ctx.request,
      severity: 'error',
      unhandled: false,
    });

    if (err.internal === true) {
      console.warn(err.devMessage);
      console.error(errMsg);
      logging.debug(err.stack);
      ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;

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

    ctx.response.status = error.status;
  }
}
