/* eslint no-magic-numbers: 0 */
import { assert } from 'chai';
import {
  checkLuminance,
  getLuminance,
  rgbToArray,
} from './color';

const rgbInput = 'rgb(230, 48, 205)';
const threshold = 0.5;
const expectedLuminationValue = 0.47;
const expectedRGBArray = ['230', '48', '205'];

describe('RGB Color value', () => {
  it('should transform rgb value to array', () => {
    const test = rgbToArray(rgbInput);
    assert.deepEqual(test, expectedRGBArray, 'Could not convert string to array properly');
  });

  it('should have the correct luminance value', () => {
    assert.equal(
      getLuminance(rgbInput),
      expectedLuminationValue,
      'Value not correct according to weighted W3C method'
    );
  });

  it('should return the correct boolean when checked with threshold value', () => {
    assert.equal(checkLuminance(rgbInput, threshold), true, 'Boolean value incorrect');
  });
});
