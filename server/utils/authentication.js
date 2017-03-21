/**
 * Requires the request to have valid authentication.
 * When the session is empty a guest session is requested.
 * @param {function} req -
 * @param {function} res -
 * @param {function} next The function to pass the request to if authentication succeeds
 * @return {undefined}
 */
const verifyAuthenticated = (req, res, next) => {
  const t = req.session.arguToken;
  if (t) {
    const expired = t && new Date(t.expiresAt) < Date.now();
    if (t && !expired) {
      return next();
    }
    res.status(401);
    const status = expired ? 'SESSION_EXPIRED' : 'UNAUTHORIZED';
    return res.send({ status }).end();
  }
  res.status(401);
  return res.send({ status: 'NO_SESSION' }).end();
};

export default verifyAuthenticated;
