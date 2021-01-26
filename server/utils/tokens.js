import * as httpStatus from 'http-status-codes';

import { BadRequestError } from './errors';
import logging from './logging';

export const processTokenRequest = async (ctx, request) => {
  try {
    const response = await request;
    const json = await response.json();

    if (response.status === httpStatus.OK) {
      ctx.setAccessToken(json.access_token, json.refresh_token);
    }
  } catch (e) {
    if (e instanceof BadRequestError) {
      ctx.session = null;

      return;
    }

    logging.error(e);
  }
};
