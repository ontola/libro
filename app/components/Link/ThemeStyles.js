import { makeStyles } from '@material-ui/styles';

/* eslint-disable no-magic-numbers */
export default makeStyles((theme) => ({
  default: {
    alignItems: 'baseline',
    display: 'inline-flex',
    whiteSpace: 'pre-wrap',
  },
  parent: {
    '&:hover': {
      color: theme.palette.grey[800],
    },
    color: theme.palette.grey[600],
    display: 'inline-flex',
    fontWeight: 'bold',
    margin: '0 .2em',
    transition: 'background-color .1s',
  },
}));
/* eslint-enable no-magic-numbers */
