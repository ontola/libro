import button from '../../../common/theme/components/button';

export default (theme) => {
  const customButton = button(theme);
  customButton.MuiButton.root['&.active'] = {
    background: 'hsla(0, 0%, 100%, .85)',
    color: theme.palette.common.black,
  };
  customButton.MuiButton.root['&.active .MuiButton-label:after'] = null;

  return customButton;
};
