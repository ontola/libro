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
    this.status = 400;
  }

  static get status() { return 400; }

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

  static get status() { return 401; }

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

  static get status() { return 403; }

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

  static get status() { return 404; }

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

  static get status() { return 422; }

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

  static get status() { return 500; }

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

  static get status() { return 501; }

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

  static get status() { return 502; }

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

  static get status() { return 503; }

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

  static get status() { return 504; }

  static getErrorMessage() {
    return 'Gateway timeout, please try again.';
  }
}

export default function getErrorClass(status) {
  switch (status) {
    case 400:
      return BadRequestError;
    case 401:
      return UnauthorizedError;
    case 403:
      return ForbiddenError;
    case 404:
      return NotFoundError;
    case 422:
      return UnprocessableEntityError;
    case 500:
      return InternalServerErrorError;
    case 501:
      return NotImplementedError;
    case 502:
      return BadGatewayError;
    case 503:
      return ServiceUnavailableError;
    case 504:
      return GatewayTimeoutError;
    default:
      return undefined;
  }
}
