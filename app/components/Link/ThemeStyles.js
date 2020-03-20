import { darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { semanticColors } from '../shared/config';

export const HOVER_COEFFICIENT = 0.3;

/* eslint-disable no-magic-numbers */
export default makeStyles((theme) => {
  const style = {
    default: {
      '&:hover .Heading': {
        color: darken(theme.palette.link.header, HOVER_COEFFICIENT),
      },
      alignItems: 'baseline',
      display: 'inline-flex',
      whiteSpace: 'pre-wrap',
    },
    parent: {
      '&:hover': {
        color: theme.palette.grey[800],
      },
      color: theme.palette.grey[600],
      display: 'inline-flex',
      fontWeight: 'bold',
      margin: '0 .2em',
      transition: 'background-color .1s',
    },
  };

  Object.keys(semanticColors)
    .forEach((type) => {
      style.default[`&:hover .Heading[typeof='${type}']`] = {
        color: darken(semanticColors[type], HOVER_COEFFICIENT),
      };
    });

  return style;
});
/* eslint-enable no-magic-numbers */
