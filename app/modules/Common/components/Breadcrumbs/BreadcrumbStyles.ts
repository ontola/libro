import { makeStyles } from '@mui/styles';

import { LibroTheme } from '../../../../themes/themes';
import { headingCID } from '../Heading';

const hoverBorderColor = '#c8c8c8';

/* eslint-disable @typescript-eslint/no-magic-numbers */
export default makeStyles<LibroTheme>((theme) => ({
  default: {
    '& .Breadcrumb__text': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    [`& .${headingCID}`]: {
      fontSize: '1em',
      margin: '0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& .NavbarLink__image': {
      display: 'inline-block',
      marginRight: '.3rem',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:last-child': {
      '&:hover': {
        borderColor: hoverBorderColor,
      },
      flexShrink: '1',
      maxWidth: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

    },
    alignItems: 'center',
    boxSizing: 'border-box',
    color: theme.palette.primary.main,
    display: 'inline-flex',
    flex: '0 100000 auto',
    fontSize: '.85rem',
    fontWeight: theme.typography.fontWeightMedium,
    height: '2rem',
    minWidth: '1.4em',
    whiteSpace: 'nowrap',
  },
}));
/* eslint-enable @typescript-eslint/no-magic-numbers */
