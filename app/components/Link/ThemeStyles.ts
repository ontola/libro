import { darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { headingCID } from '../Heading';

export const HOVER_COEFFICIENT = 0.3;

export default makeStyles((theme) => {
  const style = {
    default: {
      [`&:hover .${headingCID}`]: {
        color: darken(theme.palette.link?.header || theme.palette.common.black, HOVER_COEFFICIENT),
      },
      'display': 'inline-flex',
      'whiteSpace': 'pre-wrap',
    },
  } as { [index: string]: any; };

  Object
    .keys(theme.semanticColors)
    .forEach((type) => {
      style.default[`&:hover .${headingCID}[typeof='${type}']`] = {
        color: darken(theme.semanticColors[type], HOVER_COEFFICIENT),
      };
    });

  return style;
});
