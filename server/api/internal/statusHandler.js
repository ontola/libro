import HttpStatus from 'http-status-codes';

import getErrorClass from '../../utils/errors';

function getDevMessage(status) {
  switch (status) {
  case HttpStatus.UNAUTHORIZED:
    return 'Not authenticated to backend (is an oauth token present?)';
  default:
    return undefined;
  }
}

/**
 * Processes responses from the Argu API/SPI.
 * These responses should be kept internal and processed into an appropriate response
 *   for the client.
 * @param {Response} response A fetch-style response object.
 * @return {Promise<Response|Error>} The response if valid, an error object otherwise.
 */
export default async function processResponse(response) {
  if (response.status >= HttpStatus.OK && response.status < HttpStatus.MULTIPLE_CHOICES) {
    return response;
  }

  const ErrClass = getErrorClass(response.status);
  if (typeof ErrClass === 'undefined') {
    throw new Error(`Unhandled server status code '${response.status}'`);
  }
  const devMsg = getDevMessage(response.status);
  const err = new ErrClass(devMsg);
  err.response = response;
  if (devMsg) {
    err.internal = true;
  }

  throw err;
}
