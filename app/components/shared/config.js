// TODO: remove when migrated to material
export const navbarHeight = '3.2rem';

export const headingSizes = ['1', '2', '3', '4', '5', '6'];

export const headingVariants = [
  'alert',
  'column',
  'con',
  'default',
  'default',
  'error',
  'light',
  'motion',
  'notice',
  'pro',
  'pro',
  'question',
];

export const shades = [
  'default',
  'lighter',
  'light',
  'dark',
  'white',
];

export const sides = [
  'yes',
  'no',
  'neutral',
];

export const sizes = [
  'small',
  'medium',
  'large',
];

export const statuses = [
  'pass',
  'fail',
  'retracted',
  'planned',
  'open',
  'closed',
];

export const types = [
  'idea',
  'motion',
  'challenge',
  'meeting',
  'attachment',
  'argumentPro',
  'argumentCon',
  'project',
];

const mqBreakpoints = {
  largeLowerBound: '900px',
  microUpperBound: '320px',
  smallLowerBound: '650px',
  smallUpperBound: __CLIENT__ ? '899.5px' : '900px',
  smallestLowerBound: __CLIENT__ ? '319.5px' : '320px',
  smallestUpperBound: __CLIENT__ ? '649.5px' : '650px',
};

export const mediaQueries = {
  largeAndAbove: `(min-width: ${mqBreakpoints.largeLowerBound})`,
  micro: `(max-width: ${mqBreakpoints.microUpperBound})`,
  smallAndAbove: `(min-width: ${mqBreakpoints.smallestUpperBound})`,
  smallAndBelow: `(max-width: ${mqBreakpoints.smallUpperBound})`,
  smallOnly: `(min-width: ${mqBreakpoints.smallLowerBound}) and (max-width: ${mqBreakpoints.smallUpperBound})`,
  smallestOnly: `(min-width: ${mqBreakpoints.smallestLowerBound})  and (max-width: ${mqBreakpoints.smallestUpperBound})`,
};

/* eslint-disable no-magic-numbers */
// These should match /shared/config.scss
export const colors = {
  blue: {
    base: 'rgb(71, 86, 104)',
  },
  grey: {
    'x-light': 'rgb(230, 230, 230)',
  },
};
