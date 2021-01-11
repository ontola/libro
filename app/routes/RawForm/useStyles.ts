import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    margin: '0.25rem 0 0.3rem 0.3rem',
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'right',
  },
  loading: {
    color: '#aaa',
    fontSize: '1em',
    fontWeight: 'bold',
    padding: '25px 0',
  },
  predicateLabel: {
    alignSelf: 'center',
    overflow: 'hidden',
    width: '150px',
  },
  predicatesGroup: {
    marginTop: '1rem',
  },
  renderCount: {
    background: '#eee',
    border: '1px solid #ddd',
    borderRadius: '15px',
    fontStyle: 'normal',
    height: '30px',
    lineHeight: '30px',
    position: 'relative',
    right: 0,
    textAlign: 'center',
    top: 0,
    width: '30px',
  },
  rowWrapper: {
    '& .MuiAutocomplete-input': {
      flexGrow: 1,
    },
    '& .MuiIconButton-root': {
      alignSelf: 'center',
      maxHeight: '2rem',
      maxWidth: '2rem',
      minHeight: '2rem',
      minWidth: '2rem',
    },
    '& .MuiInputBase-root': {
      alignItems: 'center',
      border: 0,
      borderRadius: 0,
      flexGrow: 1,
      marginLeft: '5px',
    },
    '& .MuiSelect-root': {
      fontSize: '.9rem',
      paddingBottom: '0',
      paddingTop: '0',
    },
    '& .MuiTextField-root': {
      border: 0,
      borderRadius: 0,
      flexGrow: 1,
      margin: 0,
    },
    '& .MuiToggleButton-root': {
      background: 'none',
      border: 'none',
      paddingBottom: 0,
      paddingTop: 0,
    },
    '& .MuiToggleButtonGroup-root': {
      display: 'flex',
    },
    '& input[type="checkbox"]': {
      alignSelf: 'center',
    },
    '& input[type="text"]': {
      backgroundColor: '#f8f8f8',
      border: 'solid 1px #e6e6e6',
      borderRadius: '5px',
      flexGrow: 1,
      fontFamily: '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '.9rem',
      padding: '10.5px 14px',
      transition: 'border-color .2s, background-color .2s',
    },
    '& label': {
      color: '#707070',
      display: 'block',
      fontSize: '.9rem',
      fontWeight: 'bold',
      paddingBottom: '.3rem',
    },
    'display': 'flex',
    'flexDirection': 'row',
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '.5rem',
  },
  wrapper: {
    '& h1': {
      color: 'rgb(51, 51, 51)',
      fontFamily: '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
      fontSize: '1.6rem',
      fontWeight: 'bold',
      lineHeight: '1.3',
    },
    '& h2': {
      color: 'rgb(51, 51, 51)',
      fontFamily: '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      lineHeight: '1.3',
      marginBottom: '.5rem',
      marginTop: '1rem',
    },
    '& h3': {
      color: '#707070',
      display: 'block',
      fontFamily: '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '.9rem',
      fontWeight: 'bold',
      marginTop: '.7rem',
      paddingBottom: '.3rem',
    },
    'backgroundColor': 'white',
    'borderRadius': '3px',
    'boxShadow': '0 1px 5px rgba(0, 0, 0, 0.1)',
    'display': 'flex',
    'flexDirection': 'column',
    'margin': '1rem auto',
    'maxWidth': '800px',
    'padding': '0 1.3rem 2.9rem 1.3rem',
    'position': 'relative',
    'width': '100%',
  },
}));

export default useStyles;
