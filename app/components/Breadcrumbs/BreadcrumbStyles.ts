import { makeStyles } from '@material-ui/styles';

import { LibroTheme } from '../../themes/themes';

const breadCrumBorder = '1px solid #e6e6e6';
const hoverBorderColor = '#c8c8c8';

/* eslint-disable @typescript-eslint/no-magic-numbers */
export default makeStyles<LibroTheme>((theme) => ({
  default: {
    '& .Breadcrumb__text': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& .Heading': {
      fontSize: '1em',
      margin: '0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& .NavbarLink__image': {
      display: 'inline-block',
      marginRight: '.3rem',
    },
    '&:first-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderTopLeftRadius: theme.shape.borderRadius,
    },
    '&:hover': {
      borderColor: hoverBorderColor,
      color: theme.palette.grey[800],
    },
    '&:last-child': {
      '&:hover': {
        borderColor: hoverBorderColor,
      },
      borderBottomRightRadius: theme.shape.borderRadius,
      borderRight: breadCrumBorder,
      borderTopRightRadius: theme.shape.borderRadius,
      flexGrow: '1',
      flexShrink: '1',
      maxWidth: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

    },
    'alignItems': 'center',
    'backgroundColor': theme.palette.common.white,
    'border': breadCrumBorder,
    'borderRight': 0,
    'boxSizing': 'border-box',
    'color': theme.palette.grey[600],
    'display': 'inline-flex',
    'flex': '0 100000 auto',
    'fontSize': '.85rem',
    'height': '2rem',
    'minWidth': '1.4em',
    'overflow': 'hidden',
    'paddingLeft': theme.spacing(3),
    'paddingRight': theme.spacing(3),
    'whiteSpace': 'nowrap',
  },
}));
/* eslint-enable @typescript-eslint/no-magic-numbers */
