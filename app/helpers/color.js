/**
 * A string to describe an RGB color. Formatted as `#RRGGBB`
 * @typedef {string} RGBString
 */

const RGB_NUMBER = 190;
const HUNDRED_PERCENT = 100;

/** How dark the color needs to be */
const DEFAULT_LUMINANCE_THRESHOLD = 0.5;

const R = 1;
const G = 2;
const B = 3;
const hexSplit = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

/**
 * @param {RGBString} str A rgb color string
 * @return {bool} True if string is rgb
 */
const isRGB = (str) => /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(str);

/**
 * Converts an rgb string to an array of number values.
 * @param {RGBString} rgb A rgb color string
 * @return {array} An Array of the rgb values
 */
const rgbToArray = (rgb) => rgb.replace(/[^\d,]/g, '').split(',');

/**
 * For more info on this see check these links:
 * http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 * https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
 * @param {RGBString} rgb The color to compare against.
 * @return {string} luminance index number of rgb string
 */
const getLuminance = (rgb) => {
  const LIMIT = 255;
  const DECIMALS = 2;
  const aR = 0.299;
  const aG = 0.587;
  const aB = 0.117;
  const coefficients = [aR, aG, aB];
  let rgbArray;

  if (!rgb) {
    return undefined;
  } else if (!Array.isArray(rgb)) {
    rgbArray = rgbToArray(rgb);
  } else {
    rgbArray = rgb;
  }

  const all = coefficients.map((a, i) => (rgbArray[i] / LIMIT) * a);

  return all.reduce((prev, curr) => prev + curr).toFixed(DECIMALS);
};

/**
 * Converts a hex color string to an RGB color string
 * @param {string} hex A hex color string
 * @return {RGBString} rgb color string
 */
function hexToRgb(hex) {
  const result = hexSplit.exec(hex);

  return result ? `rgb(${parseInt(result[R], 16)},${parseInt(result[G], 16)},${parseInt(result[B], 16)})` : null;
}

/**
 * Checks whether an rgb color is luminous enough.
 * @param {RGBString} rgb A rgb color string
 * @param {number} threshold A decimal number
 * @return {boolean} True if luminance is below threshold
 */
const checkLuminance = (
  rgb,
  threshold = DEFAULT_LUMINANCE_THRESHOLD
) => getLuminance(rgb) < threshold;

/**
 * Returns an rgb string for a value between 0-100. Low values return green, high red.
 * @param {number} percentage 0-100
 * @return {RGBString} css RGB value
 */
const percentageToRedOrGreen = (percentage) => {
  const red = RGB_NUMBER - (RGB_NUMBER * (percentage / HUNDRED_PERCENT));
  const green = RGB_NUMBER * (percentage / HUNDRED_PERCENT);
  const blue = 0;

  return `rgb(${Math.floor(red)},${Math.floor(green)},${Math.floor(blue)})`;
};

export {
  checkLuminance,
  getLuminance,
  isRGB,
  hexToRgb,
  percentageToRedOrGreen,
  rgbToArray,
};
