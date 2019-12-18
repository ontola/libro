import { createMuiTheme } from '@material-ui/core';

import { colors, theme } from '../common/variables';

export default {
  ...colors,
  theme: createMuiTheme(theme),
};
