import HttpStatus from 'http-status-codes';

import handleAsyncErrors from '../utils/handleAsyncErrors';

/**
 * Requires the request to have valid authentication.
 * When the session is empty a guest session is requested.
 * @module
 * @param {function} req -
 * @param {function} res -
 * @param {function} next The function to pass the request to if authentication succeeds
 * @return {undefined}
 */
async function authenticationMiddleware(req, res, next) {
  const t = req.session.arguToken;
  if (t) {
    const expired = t && new Date(t.expiresAt) < Date.now();
    if (t && !expired) {
      return next();
    }
    if (!expired) {
      res.status = HttpStatus.UNAUTHORIZED;

      return res
        .send({ status: 'UNAUTHORIZED' })
        .end();
    }
  }

  return next();
}

export default handleAsyncErrors(authenticationMiddleware);
