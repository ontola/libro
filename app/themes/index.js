import { createMuiTheme } from '@material-ui/core';
import deepmerge from 'deepmerge';

import common from './common/theme';
import dutchGovernment from './dutchGovernment/theme';
import groenLinks from './groenLinks/theme';

const generateStyle = ({
  components,
  variables,
}) => (variableOverwrites) => {
  const mergedVariables = deepmerge(variables, variableOverwrites);
  const theme = createMuiTheme(mergedVariables);

  theme.overrides.MuiCssBaseline = {
    '@global': {
      html: {
        background: mergedVariables.palette.background.default,
      },
    },
  };

  if (components) {
    theme.overrides = components.reduce(
      (acc, component) => ({
        ...acc,
        ...component(theme),
      }),
      theme.overrides
    );
  }

  theme.appBar.resolveColor = () => {
    const { appBar: { background, color }, palette } = theme;

    if (color === 'auto' && background) {
      return palette[background].contrastText;
    } else if (color) {
      return palette[color].main;
    }

    return null;
  };

  return theme;
};

export default {
  common: generateStyle(common),
  dutchGovernment: generateStyle(dutchGovernment),
  groenLinks: generateStyle(groenLinks),
};
