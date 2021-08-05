import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export interface FlowBackgroundProps {
  checkmarks: boolean;
  progress: number;
}

interface Circle {
  x: number;
  y: number;
  r: number;
  classIndex: number;
}

/*eslint-disable object-property-newline, object-curly-newline*/
const circles: Circle[] = [
  { classIndex: 1, r: 50, x: 0, y: 0 },
  { classIndex: 2, r: 100, x: 50, y: 200 },
  { classIndex: 1, r: 30, x: 520, y: 400 },
  { classIndex: 3, r: 90, x: 450, y: 600 },
  { classIndex: 3, r: 100, x: 100, y: 800 },
  { classIndex: 2, r: 40, x: 300, y: 1000 },
  { classIndex: 1, r: 80, x: 600, y: 1200 },
  { classIndex: 2, r: 60, x: 0, y: 1400 },
  { classIndex: 1, r: 40, x: 200, y: 1600 },
  { classIndex: 3, r: 100, x: 700, y: 1800 },
  { classIndex: 2, r: 50, x: 300, y: 2000 },
];
/*eslint-enable object-property-newline, object-curly-newline */

const CHECKMARK_SCALE_FACTOR = 0.10;

const useStyles = makeStyles<LibroTheme, { progress: number, noMotion: boolean }>({
  '@keyframes float1': {
    '0 %': {
      opacity: '1',
      transform: 'translate(0, 0)',
    },
    '50%': {
      opacity: '.7',
      transform: 'translate(-10px, 0)',
    },
    '100%': {
      opacity: '1',
      transform: 'translate(0, 0)',
    },
  },
  '@keyframes float2': {
    '0%': {
      opacity: '.5',
      transform: 'translate(0, 0) ',
    },
    '50%': {
      opacity: '1',
      transform: 'translate(-5px, -5px)',
    },
    '100%': {
      opacity: '.5',
      transform: 'translate(0, 0)',
    },
  },
  '@keyframes float3': {
    '0%': {
      opacity: '1',
      transform: 'translate(0, 0)',
    },
    '50%': {
      opacity: '.8',
      transform: 'translate(0, -10px)',
    },
    '100%': {
      opacity: '10',
      transform: 'translate(0, 0)',
    },
  },
  '@keyframes intro': {
    'from': {
      opacity: '0',
    },
    'to': {
      opacity: '0.2',
    },
  },
  background: {
    animation: '$intro 1s',
    height: '100vh',
    left: 0,
    opacity: '0.2',
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    width: '100vw',
  },
  float1: {
    animation: '$float1 infinite',
    animationDuration: ({ noMotion }) => noMotion ? '0s' : '15s',
  },
  float2: {
    animation: '$float2 infinite',
    animationDuration: ({ noMotion }) => noMotion ? '0s' : '18s',
  },
  float3: {
    animation: '$float3 infinite',
    animationDuration: ({ noMotion }) => noMotion ? '0s' : '22s',
  },
  svg: {
    transform: ({ noMotion, progress }) => noMotion ? 'unset' : `translateY(calc(-${progress}% * .2))`,
    transition: 'transform 200ms ease',
    width: '100%',
  },
});

export const FlowBackground = ({
  checkmarks,
  progress,
}: FlowBackgroundProps): JSX.Element => {
  const noMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const classes = useStyles({
    noMotion,
    progress,
  });
  const theme = useTheme<LibroTheme>();

  return (
    <div className={classes.background}>
      <svg
        className={classes.svg}
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 600 2000"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {(progress < 100 || !checkmarks) && circles.map((circle) => (
          <circle
            className={classes[`float${circle.classIndex}`]}
            cx={circle.x}
            cy={circle.y}
            fill={theme.palette.primary.main}
            key={circle.y}
            r={circle.r}
          />
        ))}
        {progress >= 100 && checkmarks && circles.map((c) => (
          <g
            key={c.y}
            transform={`translate(${c.x}, ${c.y}), scale(${c.r * CHECKMARK_SCALE_FACTOR})`}
          >
            <path
              className={classes[`float${c.classIndex}`]}
              d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
              fill={theme.palette.primary.main}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
