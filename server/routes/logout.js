import * as HttpStatus from 'http-status-codes';

export default (req, res) => {
  res.setHeader('Vary', 'Accept,Accept-Encoding,Content-Type');

  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }

    return res.sendStatus(HttpStatus.NO_CONTENT).end();
  });
};
