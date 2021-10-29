import Koa from 'koa';
import uuidv4 from 'uuid/v4';

import { defaultManifest } from '../../../common/defaultManifest'
import { enhanceCtx } from '../../middleware/ctxMiddleware';
import { renderFullPage } from '../render';

function generateRenderParams() {
  const req = {
    headers: {},
    session: {
      userToken: '',
    },
    url: 'https://app.argu.localtest/',
  };
  const res = {
    locals: {
      nonce: uuidv4(),
    },
  };
  const ctx = enhanceCtx(new Koa().createContext(req, res));
  ctx.session = {};
  ctx.manifest = defaultManifest('https://app.argu.localtest/');

  return ctx;
}

describe('server', () => {
  describe('renderFullPage', () => {
    it('renders the navbar preview', async () => {
      const ctx = generateRenderParams();
      const body = await renderFullPage(ctx, '');

      expect(typeof body).toEqual('string');
      expect(body).toContain('id="navbar-preview"');
    });
  });
});
