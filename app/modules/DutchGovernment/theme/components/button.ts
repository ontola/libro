import button from '../../../Common/theme/components/button';
import { LibroTheme, MaterialStyleMap } from '../../../Kernel/lib/themes';

export default (theme: LibroTheme): MaterialStyleMap => {
  const customButton = button();
  customButton.MuiButton.styleOverrides.root['&.active'] = {
    background: 'hsla(0, 0%, 100%, .85)',
    color: theme.palette.common.black,
  };
  customButton.MuiButton.styleOverrides.root['&.active .MuiButton-label:after'] = null;

  return customButton;
};
