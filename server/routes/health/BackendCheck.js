import { btoa } from '../../../globals';
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
      return (await api.tenants())?.sites;
    } catch (e) {
      if (__DEVELOPMENT__ && typeof e?.response !== 'undefined') {
        const text = await e.response.text();
        this.debug = this.htmlPopupButton(text);
      }

      return e;
    }
  }

  htmlPopupButton(contents) {
    const elId = `showDebugInfo${Math.random().toString().slice('0.'.length, -1)}`;

    return (`
        <button id="${elId}">Show response</button>
        <script nonce="${this.nonce}">
          document
            .getElementById('${elId}')
            .addEventListener('click', function () {
              const dHandle = window.open("", "Debug info");
              dHandle.document.body.innerHTML = atob('${btoa(contents)}')
            });
        </script>
    `);
  }
}
