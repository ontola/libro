import API from '../../API';

import Check from './check';

export default class BackendCheck extends Check {
  constructor(nonce) {
    super('Backend connectivity');
    this.nonce = nonce;
  }

  async runTest() {
    const api = new API({ request: { headers: {} } });

    try {
      const tenants = (await api.tenants());

      if (__DEVELOPMENT__) {
        this.debug = this.jsonHtmlPopupButton(tenants, 'Show tenants');
      }

      return tenants?.sites;
    } catch (e) {
      if (__DEVELOPMENT__ && typeof e?.response !== 'undefined') {
        const text = await e.response.text();
        this.debug = this.htmlPopupButton(text);
      }

      return e;
    }
  }
}
