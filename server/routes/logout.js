export default (ctx) => {
  ctx.response.set('Vary', 'Accept,Accept-Encoding,Content-Type');

  ctx.api.logout();

  ctx.session = null;
};
