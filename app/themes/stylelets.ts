import { checkLuminance, hexToRgb } from '../helpers/color';
import { LibroTheme } from './common/theme/types';

export const hoverHighlight = (theme: LibroTheme) => ({
  '&:hover': {
    backgroundColor: checkLuminance(hexToRgb(theme.palette.primary.contrastText))
      ? theme.palette.grey['300']
      : theme.palette.grey['800'],
    cursor: 'pointer',
  },
});
