import getErrorClass from '../../utils/errors';

function getDevMessage(status) {
  switch (status) {
    case 401:
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
export default function processResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const ErrClass = getErrorClass(response.status);
  if (typeof ErrClass === 'undefined') {
    throw new Error('Unhandled exception');
  }
  const err = new ErrClass(getDevMessage(response.status));
  err.internal = true;
  err.response = response;
  return Promise.reject(err);
}
