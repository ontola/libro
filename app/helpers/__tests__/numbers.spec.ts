/* eslint-disable @typescript-eslint/no-magic-numbers */

import { calcPercentage } from '../numbers';

describe('helpers', () => {
  describe('numbers', () => {
    describe('calcPercentage', () => {
      it('transforms to percentage', () => {
        expect(calcPercentage(1, 8)).toEqual(13);
      });

      it('rejects zero divisions', () => {
        expect(calcPercentage(45, 0)).toBeUndefined();
      });

      it('rejects non-number parameters', () => {
        expect(calcPercentage('joe', 32)).toBeUndefined();
      });
    });
  });
});

/* eslint-enable @typescript-eslint/no-magic-numbers */
