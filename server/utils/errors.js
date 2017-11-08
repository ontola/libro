import HttpStatus from 'http-status-codes';

/**
 * Provides error classes to be used in the server.
 * These can be raised to indicate a certain error has occurred.
 * These are also sent to the client, though the error raised might not be the same as
 *   communicated back to the user.
 * @module
 */

/**
 * Makes extended error's names show up as the declared class name rather than the default
 *   e.g. `BadRequestError` instead of just `Error`.
 */
class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

/**
 * Base error class for server errors.
 * @interface
 */
export class ArguError extends ExtendableError {
  constructor(message) {
    super(message);
    this.internal = false;
  }

  static get status() { throw new Error('Required error status not implemented'); }

  static getErrorMessage() {
    throw new Error('Required error message not implemented');
  }

  get response() {
    if (!this.internal) throw new Error("Can't use response outside internal errors.");
    return this.responseObj;
  }

  set response(value) {
    if (!this.internal) throw new Error("Can't use response outside internal errors.");
    this.responseObj = value;
  }
}

// HTTP Client errors

export class BadRequestError extends ArguError {
  constructor(devMessage) {
    super(BadRequestError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = HttpStatus.BAD_REQUEST;
  }

  static get status() { return HttpStatus.BAD_REQUEST; }

  static getErrorMessage() {
    return 'Bad request, the request could not be processed.';
  }
}

export class UnauthorizedError extends ArguError {
  constructor(devMessage) {
    super(UnauthorizedError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = UnauthorizedError.status;
  }

  static get status() { return HttpStatus.UNAUTHORIZED; }

  static getErrorMessage() {
    return 'Not authorized, please log in to continue.';
  }
}

export class ForbiddenError extends ArguError {
  constructor(devMessage) {
    super(ForbiddenError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = ForbiddenError.status;
  }

  static get status() { return HttpStatus.FORBIDDEN; }

  static getErrorMessage() {
    return 'Forbidden, ask your manager for permission.';
  }
}

export class NotFoundError extends ArguError {
  constructor(devMessage) {
    super(NotFoundError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = NotFoundError.status;
  }

  static get status() { return HttpStatus.NOT_FOUND; }

  static getErrorMessage() {
    return 'Resource could not be found, check if the URL is correct.';
  }
}

export class UnprocessableEntityError extends ArguError {
  constructor(devMessage) {
    super(UnprocessableEntityError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = UnprocessableEntityError.status;
  }

  static get status() { return HttpStatus.UNPROCESSABLE_ENTITY; }

  static getErrorMessage() {
    return 'Request is valid but failed due to semantics, check the contents of the request.';
  }
}

// HTTP Server errors

export class InternalServerErrorError extends ArguError {
  constructor(devMessage) {
    super(InternalServerErrorError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = InternalServerErrorError.status;
  }

  static get status() { return HttpStatus.INTERNAL_SERVER_ERROR; }

  static getErrorMessage() {
    return 'An internal server error occurred, please try again.';
  }
}

export class NotImplementedError extends ArguError {
  constructor(devMessage) {
    super(NotImplementedError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = NotImplementedError.status;
  }

  static get status() { return HttpStatus.NOT_IMPLEMENTED; }

  static getErrorMessage() {
    return 'Feature is not implemented yet';
  }
}

export class BadGatewayError extends ArguError {
  constructor(devMessage) {
    super(BadGatewayError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = BadGatewayError.status;
  }

  static get status() { return HttpStatus.BAD_GATEWAY; }

  static getErrorMessage() {
    return 'Bad gateway, please try again later.';
  }
}

export class ServiceUnavailableError extends ArguError {
  constructor(devMessage) {
    super(ServiceUnavailableError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = ServiceUnavailableError.status;
  }

  static get status() { return HttpStatus.SERVICE_UNAVAILABLE; }

  static getErrorMessage() {
    return 'Service unavailable, please try again later.';
  }
}

export class GatewayTimeoutError extends ArguError {
  constructor(devMessage) {
    super(GatewayTimeoutError.getErrorMessage());
    this.devMessage = devMessage;
    this.status = GatewayTimeoutError.status;
  }

  static get status() { return HttpStatus.GATEWAY_TIMEOUT; }

  static getErrorMessage() {
    return 'Gateway timeout, please try again.';
  }
}

export default function getErrorClass(status) {
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      return BadRequestError;
    case HttpStatus.UNAUTHORIZED:
      return UnauthorizedError;
    case HttpStatus.FORBIDDEN:
      return ForbiddenError;
    case HttpStatus.NOT_FOUND:
      return NotFoundError;
    case HttpStatus.UNPROCESSABLE_ENTITY:
      return UnprocessableEntityError;
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return InternalServerErrorError;
    case HttpStatus.NOT_IMPLEMENTED:
      return NotImplementedError;
    case HttpStatus.BAD_GATEWAY:
      return BadGatewayError;
    case HttpStatus.SERVICE_UNAVAILABLE:
      return ServiceUnavailableError;
    case HttpStatus.GATEWAY_TIMEOUT:
      return GatewayTimeoutError;
    default:
      return undefined;
  }
}
