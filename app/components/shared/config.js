export const headingSizes = ['1', '2', '3', '4', '5', '6'];

export const headingVariants = [
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
  smallUpperBound: 'calc(900px - .5px)',
  smallestLowerBound: 'calc(320px + .5px)',
  smallestUpperBound: 'calc(650px - .5px)',
};

export const mediaQueries = {
  largeAndAbove: `(min-width: ${mqBreakpoints.largeLowerBound})`,
  micro: `(max-width: ${mqBreakpoints.microUpperBound})`,
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
