import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    margin: '0.25rem 0 0.3rem 0.3rem',
  },
  renderCount: {
    position: 'relative',
    top: 0,
    right: 0,
    fontStyle: 'normal',
    textAlign: 'center',
    height: '30px',
    width: '30px',
    lineHeight: '30px',
    borderRadius: '15px',
    border: '1px solid #ddd',
    background: '#eee',
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
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
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
    '& .MuiAutocomplete-input': {
      flexGrow: 1,
    },
    '& .MuiInputBase-root': {
      alignItems: 'center',
      // display: 'flex',
      // flexDirection: 'row',
      border: 0,
      borderRadius: 0,
      flexGrow: 1,
      marginLeft: '2px',
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
      paddingBottom: 0,
      paddingTop: 0,
    },
    '& .MuiToggleButtonGroup-root': {
      display: 'flex',
    },
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1.5rem',
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: '3px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem auto',
    maxWidth: '750px',
    padding: '0 1.3rem 2.9rem 1.3rem',
    position: 'relative',
    width: '100%',
    '& h1': {
      fontFamily: '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
      lineHeight: '1.3',
      marginBottom: '.6rem',
      color: 'rgb(51, 51, 51)',
      fontSize: '1.6rem',
      fontWeight: 'bold',
    },
  }
}));

export default useStyles;
