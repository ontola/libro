import API from '../API';

export default function apiMiddleware(req, res, next) {
  if (req.api) {
    next();
    return;
  }

  req.api = new API();

  next();
}
