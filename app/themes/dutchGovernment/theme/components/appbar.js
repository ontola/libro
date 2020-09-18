import appbar from '../../../common/theme/components/appbar';

export default (theme) => {
  const customAppBar = appbar(theme);
  customAppBar.MuiAppBar.root = {
    ...customAppBar.MuiAppBar.root,
    '& .MuiButton-root': {
      borderRadius: 0,
      height: '100%',
      whiteSpace: 'nowrap',
    },
    '& .MuiButton-root.active .MuiButton-label:after': {
      '&::after': {
        content: 'none',
      },
    },
    '& .MuiButton-root:hover': {
      background: 'hsla(0, 0%, 100%, .85)',
      color: theme.palette.common.black,
      textDecoration: 'underline',
    },
    fontSize: '1.125rem',
  };

  return customAppBar;
};
