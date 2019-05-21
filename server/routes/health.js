import * as HttpStatus from 'http-status-codes';

import API from '../API';
import { client } from '../middleware/sessionMiddleware';

export default async (req, res) => {
  try {
    // Check redis connection
    await client.get('');

    // Check back-end token validity
    const api = new API({ req: {} });
    await api.requestGuestToken();

    return res.status(HttpStatus.OK).send('success').end();
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.toString()).end();
  }
};
