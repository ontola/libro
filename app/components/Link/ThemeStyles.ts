import { darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { semanticColors } from '../shared/config';

export const HOVER_COEFFICIENT = 0.3;

export default makeStyles((theme) => {
  const style = {
    default: {
      '&:hover .Heading': {
        color: darken(theme.palette.link?.header || theme.palette.common.black, HOVER_COEFFICIENT),
      },
      'display': 'inline-flex',
      'whiteSpace': 'pre-wrap',
    },
  } as { [index: string]: any; };

  Object
    .keys(semanticColors)
    .forEach((type) => {
      style.default[`&:hover .Heading[typeof='${type}']`] = {
        color: darken(semanticColors[type], HOVER_COEFFICIENT),
      };
    });

  return style;
});
