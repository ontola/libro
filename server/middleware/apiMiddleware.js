import API from '../API';

export default function apiMiddleware(req, res, next) {
  const userToken = req.session && req.session.arguToken && req.session.arguToken.accessToken;

  req.api = new API({
    userToken,
  });

  next();
}
