import { darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LibroTheme } from '../../themes/common/theme/types';
import { semanticColors } from '../shared/config';

export const HOVER_COEFFICIENT = 0.3;

declare module '@material-ui/core/styles/createPalette' {
  interface LinkOptions {
    header: string;
  }

  interface Palette {
    link: LinkOptions;
  }
}

/* eslint-disable @typescript-eslint/no-magic-numbers */
export default makeStyles((theme: LibroTheme) => {
  const style = {
    default: {
      '&:hover .Heading': {
        color: darken(theme.palette.link?.header || theme.palette.common.black, HOVER_COEFFICIENT),
      },
      'alignItems': 'baseline',
      'display': 'inline-flex',
      'whiteSpace': 'pre-wrap',
    },
    parent: {
      '&:hover': {
        color: theme.palette.grey[800],
      },
      'color': theme.palette.grey[600],
      'display': 'inline-flex',
      'fontWeight': 'bold',
      'margin': '0 .2em',
      'transition': 'background-color .1s',
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
/* eslint-enable @typescript-eslint/no-magic-numbers */
