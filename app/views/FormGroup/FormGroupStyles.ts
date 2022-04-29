import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  caret: {
    alignSelf: 'flex-start',
    padding: '0.3rem 0.5rem',
  },
  description: {
    flex: '1',
  },
  error: {
    '& .fa': {
      marginRight: '.2em',
      verticalAlign: 'middle',
    },
    'color': theme.palette.error.dark,
    'marginRight': '.5em',
  },
  fieldSet: {
    flex: '1',
    paddingTop: '1em',
  },
  hidden: {
    display: 'none',
  },
  labelButton: {
    display: 'flex',
    flex: '1',
    marginBottom: '1rem',
    textAlign: 'left',
    width: '100%',
  },
  legend: {
    flex: '1',
  },
}));
