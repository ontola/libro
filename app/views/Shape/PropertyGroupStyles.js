import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  caret: {
    alignSelf: 'flex-end',
  },
  description: {
    flex: '1',
  },
  error: {
    '& .fa': {
      marginRight: '.2em',
      verticalAlign: 'middle',
    },
    color: theme.palette.error.dark,
    marginRight: '.5em',
  },
  fieldSet: {
    flex: '1',
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
