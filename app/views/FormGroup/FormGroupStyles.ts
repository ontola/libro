import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme: any) => ({
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
    'color': theme.palette.error.dark,
    'marginRight': '.5em',
  },
  fieldSet: {
    borderTop: '1px solid #e7e7e7',
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
