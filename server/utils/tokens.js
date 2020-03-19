import * as httpStatus from 'http-status-codes';

export const processTokenRequest = async (ctx, request) => {
  const response = await request;
  const json = await response.json();

  if (response.status === httpStatus.OK) {
    ctx.setAccessToken(json.access_token, json.refresh_token);
  } else {
    throw new Error(`Unhandled server status code '${response.status}'\n${json}`);
  }
};
