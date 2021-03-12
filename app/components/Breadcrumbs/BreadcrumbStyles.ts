import { makeStyles } from '@material-ui/styles';
import { LibroTheme } from '../../themes/common/theme/variables';

/* eslint-disable no-magic-numbers */
export default makeStyles((theme: LibroTheme) => ({
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
    '&:hover': {
      color: theme.palette.grey[800],
      border: theme.border.styleHover,
    },
    'alignItems': 'center',
    'backgroundColor': theme.palette.common.white,
    'borderRadius': theme.border.radius,
    'border': theme.border.style,
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
