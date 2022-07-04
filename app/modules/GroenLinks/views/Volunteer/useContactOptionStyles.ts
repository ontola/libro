import { makeStyles } from '@mui/styles';

import { LibroTheme } from '../../../Kernel/lib/themes';

export const useContactOptionStyles = makeStyles<LibroTheme>((theme) => ({
  volunteerContactOption: {
    '& a': {
      '& + a': {
        borderLeft: theme.greyBorder,
      },
      '&:hover': {
        boxShadow: `inset 0 0 0 999px ${theme.palette.transparent.midDark}`,
      },
      display: 'inline-block',
      padding: '.3em',
    },
    border: theme.greyBorder,
    borderRadius: '.5em',
    display: 'inline-block',
    margin: '.1em .2em .1em 0',
  },
  volunteerContactOptions: {
    marginBottom: '1em',
  },
}));
