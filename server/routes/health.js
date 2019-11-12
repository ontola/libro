import * as HttpStatus from 'http-status-codes';

import API from '../API';
import { client } from '../middleware/sessionMiddleware';

export default async (ctx) => {
  try {
    // Check redis connection
    await client.get('');

    // Check back-end token validity
    const api = new API({ req: {} });
    await api.requestGuestToken();

    ctx.response.status = HttpStatus.OK;
    ctx.response.body = 'success';
  } catch (e) {
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.response.body = e.toString();
  }
};
