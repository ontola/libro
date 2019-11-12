import Koa from 'koa';
import uuidv4 from 'uuid/v4';

import { renderFullPage } from '../render';

function generateRenderParams() {
  const req = {
    headers: {},
    session: {
      arguToken: {
        accessToken: '',
      },
    },
    url: 'https://app.argu.localtest/',
  };
  const res = {
    locals: {
      nonce: uuidv4(),
    },
  };
  const ctx = new Koa().createContext(req, res);
  const websiteMeta = {
    icons: [],
    ontola: {},
    scope: 'https://app.argu.localtest/',
    serviceworker: {},
  };

  return [ctx, websiteMeta];
}

describe('server', () => {
  describe('renderFullPage', () => {
    it('TODO: has a test', async () => {
      const [ctx, websiteMeta] = generateRenderParams();
      const body = await renderFullPage(ctx, websiteMeta);

      expect(typeof body).toEqual('string');
      expect(body).toContain('id="navbar-preview"');
    });
  });
});
