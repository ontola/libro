import Koa from 'koa';
import uuidv4 from 'uuid/v4';

import { renderFullPage } from '../render';

function generateRenderParams() {
  const req = {
    headers: {},
    session: {
      arguToken: '',
    },
    url: 'https://app.argu.localtest/',
  };
  const res = {
    locals: {
      nonce: uuidv4(),
    },
  };
  const ctx = new Koa().createContext(req, res);
  ctx.manifest = {
    icons: [],
    ontola: {},
    scope: 'https://app.argu.localtest/',
    serviceworker: {},
  };

  return ctx;
}

describe('server', () => {
  describe('renderFullPage', () => {
    it('TODO: has a test', async () => {
      const ctx = generateRenderParams();
      const body = await renderFullPage(ctx, Buffer.alloc(0));

      expect(typeof body).toEqual('string');
      expect(body).toContain('id="navbar-preview"');
    });
  });
});
