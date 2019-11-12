import * as HttpStatus from 'http-status-codes';

const robots = async (ctx) => {
  if (ctx.request.host === 'demogemeente.nl') {
    ctx.response.status = HttpStatus.NOT_FOUND;

    return;
  }

  ctx.response.set('Content-Type', 'text/plain');
  ctx.response.status = HttpStatus.OK;
  ctx.response.body = 'User-agent: *\r\nDisallow: /\r\n';
};

export default robots;
