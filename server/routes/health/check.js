import { NotImplementedError } from '../../utils/errors';

import WarningError from './WarningError';

export const CheckResult = {
  fail: 0,
  pass: 1,
  warn: 2,
};

export default class Check {
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

  /**
   * @abstract
   * @protected
   */
  async runTest() { // eslint-disable-line class-methods-use-this
    throw new NotImplementedError();
  }
}
