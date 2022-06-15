import { checkLuminance, hexToRgb } from '../modules/Common/lib/color';

import { CSSPropertiesMap, LibroTheme } from './themes';

export const hoverHighlight = (theme: LibroTheme): CSSPropertiesMap => ({
  '&:hover': {
    backgroundColor: checkLuminance(hexToRgb(theme.palette.primary.contrastText ?? '') ?? 'rgb(0,0,0)')
      ? theme.palette.grey.xLight
      : theme.palette.grey.midDark,
    cursor: 'pointer',
  },
});
