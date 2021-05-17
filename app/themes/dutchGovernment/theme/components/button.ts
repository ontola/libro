import button from '../../../common/theme/components/button';
import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => {
  const customButton = button();
  customButton.MuiButton.root['&.active'] = {
    background: 'hsla(0, 0%, 100%, .85)',
    color: theme.palette.common.black,
  };
  customButton.MuiButton.root['&.active .MuiButton-label:after'] = null;

  return customButton;
};
