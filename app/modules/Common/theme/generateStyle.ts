import {
  DeprecatedThemeOptions,
  PaletteColor,
  createTheme,
} from '@mui/material/styles';
import deepmerge from 'deepmerge';

import { LibroTheme, MaterialStyleMap } from '../../Kernel/lib/themes';

type ComponentStyle = (theme: LibroTheme) => MaterialStyleMap;

interface GenerateStyle {
  components?: ComponentStyle[];
  variables?: DeprecatedThemeOptions;
}

export const generateStyle = ({
  components,
  variables,
}: GenerateStyle) => (variableOverwrites: Record<string, unknown>): LibroTheme => {
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
