import {
  checkLuminance,
  getLuminance,
  hexToRgb,
  isRGB,
  percentageToRedOrGreen,
  rgbToArray, 
} from '../color';

const rgbInput = 'rgb(230, 48, 205)';
const lowInput = 'rgb(230, 231, 234)';
const rgbArray = ['230', '48', '205'];
const threshold = 0.5;
const expectedLuminationValue = '0.47';

const PERCENTAGE = 62;
const expectedRgb = 'rgb(72,117,0)';

describe('helpers', () => {
  describe('color', () => {
    describe('rgbToArray', () => {
      it('should transform rgb value to array', () => {
        const test = rgbToArray(rgbInput);
        expect(test).toEqual(rgbArray);
      });
    });

    describe('getLuminance', () => {
      it('handles rgb function input', () => {
        expect(getLuminance(rgbInput)).toEqual(expectedLuminationValue);
      });

      it('handles rgb array input', () => {
        expect(getLuminance(rgbArray)).toEqual(expectedLuminationValue);
      });
    });

    describe('hexToRgb', () => {
      it('should convert a hex value', () => {
        expect(hexToRgb('#AABBCC')).toEqual('rgb(170,187,204)');
      });
    });

    describe('isRGB', () => {
      it('validates rgb color code strings', () => {
        expect(isRGB(rgbInput)).toBe(true);
      });

      it('validates rgb color code strings', () => {
        expect(isRGB(rgbInput.slice(0, -1))).toBe(false);
      });
    });

    describe('checkLuminance', () => {
      it('is positive with custom threshold', () => {
        expect(checkLuminance(rgbInput, threshold)).toBe(true);
      });

      it('is positive without custom threshold', () => {
        expect(checkLuminance(rgbInput)).toBe(true);
      });

      it('is negative with low values', () => {
        expect(checkLuminance(lowInput)).toBe(false);
      });
    });

    describe('percentageToRedOrGreen', () => {
      it('calculates the rgb value from a percentage', () => {
        expect(percentageToRedOrGreen(PERCENTAGE)).toEqual(expectedRgb);
      });
    });
  });
});
