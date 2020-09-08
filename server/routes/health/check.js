import { btoa } from '../../../globals';
import { NotImplementedError } from '../../utils/errors';

import WarningError from './WarningError';

export const CheckResult = {
  fail: 0,
  pass: 1,
  warn: 2,
};

const JSON_SPACING = 2;

export default class Check {
  static appendPath(pathname, append) {
    return pathname.split('/').concat(append).filter(Boolean).join('/');
  }

  constructor(name, result = CheckResult.fail, message, error, debug) {
    this.name = name;
    this.result = result;
    this.message = message;
    this.error = error;
    this.debug = debug;
  }

  async run() {
    try {
      const output = await this.runTest();
      if (output instanceof Error) {
        return this.fail(output);
      }

      this.result = CheckResult.pass;

      return output;
    } catch (e) {
      return this.fail(e);
    }
  }

  fail(e) {
    this.result = e instanceof WarningError ? CheckResult.warn : CheckResult.fail;
    this.error = e;
    this.message = this.error.message;
  }

  jsonHtmlPopupButton(contents, title) {
    return this.htmlPopupButton(
      `<pre>${JSON.stringify(contents, undefined, JSON_SPACING)}</pre>`,
      title
    );
  }

  htmlPopupButton(contents, title = 'Show response') {
    const elId = `showDebugInfo${Math.random().toString().slice('0.'.length, -1)}`;

    return (`
        <button id="${elId}">${title}</button>
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

  /**
   * @abstract
   * @protected
   */
  async runTest() { // eslint-disable-line class-methods-use-this
    throw new NotImplementedError();
  }
}
