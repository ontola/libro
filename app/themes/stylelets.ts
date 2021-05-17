import { checkLuminance, hexToRgb } from '../helpers/color';

import { CSSPropertiesMap, LibroTheme } from './themes';

export const hoverHighlight = (theme: LibroTheme): CSSPropertiesMap => ({
  '&:hover': {
    backgroundColor: checkLuminance(hexToRgb(theme.palette.primary.contrastText ?? '') ?? 'rgb(0,0,0)')
      ? theme.palette.grey['300']
      : theme.palette.grey['800'],
    cursor: 'pointer',
  },
});
