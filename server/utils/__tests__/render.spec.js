import uuidv4 from 'uuid/v4';

import { renderFullPage } from '../render';

function generateRenderParams() {
  const req = {
    csrfToken() {},
    headers: {},
    session: {
      arguToken: {
        accessToken: '',
      },
    },
  };
  const res = {
    locals: {
      nonce: uuidv4(),
    },
  };
  const websiteMeta = {
    website: 'https://app.argu.localtest/',
  };

  return [req, res, websiteMeta];
}

describe('server', () => {
  describe('renderFullPage', () => {
    it('TODO: has a test', async () => {
      const [req, res, websiteMeta] = generateRenderParams();
      const body = await renderFullPage(req, res, websiteMeta);

      expect(typeof body).toEqual('string');
      expect(body).toContain('id="navbar-preview"');
    });
  });
});
