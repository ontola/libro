/*
 * DEPRECATED -- convert to makeStyles, and migrate values to app/themes/common/variables.js
 */

export const headingSizes = ['1', '2', '3', '4', '5', '6'];

export const shades = [
  'default',
  'lighter',
  'light',
  'dark',
  'white',
];

export const semanticColors = {
  'https://argu.co/ns/core#ConArgument': '#684747',
  'https://argu.co/ns/core#ProArgument': '#547f4b',
  'https://argu.co/ns/rivm#InterventionType': '#164173',
} as { [index: string]: string; };

export const sides = [
  'yes',
  'no',
  'neutral',
];

export enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

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
  smallestOnly: `(min-width: ${mqBreakpoints.smallestLowerBound}) and (max-width: ${mqBreakpoints.smallestUpperBound})`,
};

/* eslint-disable @typescript-eslint/no-magic-numbers */
// Here come the shared styles!
// These should match /shared/config.scss
export const colors = {
  blue: {
    main: 'rgb(71, 86, 104)',
  },
  grey: {
    'x-light': 'rgb(230, 230, 230)',
  },
};
