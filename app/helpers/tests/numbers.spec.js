/* eslint no-magic-numbers: 0 */
import { assert } from 'chai';
import { calcPercentage } from '../numbers';

describe('Math helpers', () => {
  it('transforms to percentage', () => {
    assert.equal(calcPercentage(1, 8), 13, 'That percentage is not correct!');
    assert.equal(calcPercentage(45, 0), undefined, 'Total amount must be larger than 0');
    assert.equal(calcPercentage('joe', 32), undefined, 'Arguments must be numbers');
  });
});
