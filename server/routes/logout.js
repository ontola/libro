import HttpStatus from 'http-status-codes';

export default async (ctx) => {
  ctx.response.set('Vary', 'Accept,Accept-Encoding,Content-Type');

  const response = await ctx.api.logout(ctx.request.headers['website-iri']);

  if (response.status === HttpStatus.OK) {
    ctx.session = null;
  }

  ctx.response.status = response.status;
};
