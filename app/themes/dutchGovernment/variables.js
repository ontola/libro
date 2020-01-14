import { createMuiTheme } from '@material-ui/core';

import { colors, theme } from '../common/variables';

export default {
  ...colors,
  theme: createMuiTheme({
    ...theme,
    ontola: {
      ...theme.ontola,
      appbar: {
        position: 'sticky',
      },
    },
    typography: {
      ...theme.typography,
      fontFamily: "'RO Sans', Calibri, Verdana, sans-serif",
    },
  }),
};
