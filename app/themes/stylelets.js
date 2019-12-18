import { checkLuminance, hexToRgb } from '../helpers/color';

export const hoverHighlight = (theme) => ({
  '&:hover': {
    backgroundColor: checkLuminance(hexToRgb(theme.palette.primary.contrastText))
      ? theme.palette.grey['300']
      : theme.palette.grey['800'],
    cursor: 'pointer',
  },
});
