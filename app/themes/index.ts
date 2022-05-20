import {
  DeprecatedThemeOptions,
  PaletteColor,
  createTheme,
} from '@mui/material/styles';
import deepmerge from 'deepmerge';

import common from './common/theme';
import dutchGovernment from './dutchGovernment/theme';
import groenLinks from './groenLinks/theme';
import salesWebsite from './salesWebsite/theme';
import { LIBRO_THEMES } from './LibroThemes';
import { LibroTheme, MaterialStyleMap } from './themes';

type ComponentStyle = (theme: LibroTheme) => MaterialStyleMap;

interface GenerateStyle {
  components?: ComponentStyle[];
  variables?: DeprecatedThemeOptions;
}

const generateStyle = ({
  components,
  variables,
}: GenerateStyle) => (variableOverwrites: Record<string, unknown>) => {
  const mergedVariables = deepmerge(variables ?? {}, variableOverwrites);
  const theme = createTheme(mergedVariables);

  if (components) {
    theme.components = components.reduce(
      (acc, component) => ({
        ...acc,
        ...component(theme),
      }),
      theme.components,
    );
  }

  if (!theme.palette.mapIcon) {
    theme.palette.mapIcon = {
      background: theme.palette.primary.main,
      backgroundHover: theme.palette.primary.light,
      text: theme.palette.common.white,
    };
  }

  theme.appBar.resolveColor = () => {
    const { appBar: { background, color }, palette } = theme;

    if (color === 'auto' && background) {
      return (palette as unknown as { [background: string]: PaletteColor })[background].contrastText;
    } else if (color) {
      return (palette as unknown as { [color: string]: PaletteColor })[color].main;
    }

    return undefined;
  };

  return theme;
};

export default {
  [LIBRO_THEMES.COMMON]: generateStyle(common),
  [LIBRO_THEMES.DUTCHGOVERNMENT]: generateStyle(dutchGovernment),
  [LIBRO_THEMES.GROENLINKS]: generateStyle(groenLinks),
  [LIBRO_THEMES.SALES]: generateStyle(salesWebsite),
};
