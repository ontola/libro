import { Color } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';

import { CSSPropertiesMap, LibroTheme } from '../../themes';

const LIGHTEN = 0.7;

interface IndexablePalette {
  [key: string]: Color;
  [key: number]: Color;
}

const useStyles = makeStyles((theme: LibroTheme): CSSPropertiesMap => {
  const backgroundColor = theme.appBar.background
    ? (theme.palette as unknown as IndexablePalette)[theme.appBar.background]?.main || theme.palette.common.black
    : theme.palette.common.black;

  return ({
    header: {
      background: theme.palette.common.white,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: 0,
      minHeight: '93px',
      position: 'relative',
    },
    logo: {
      marginTop: '-11px',
      paddingLeft: '134px',
      paddingRight: 0,
      textDecoration: 'none',
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
        minHeight: '88px',
        paddingLeft: '240px',
        paddingRight: 0,
      },
    },
    navBarTitlebar: {
      backgroundColor: lighten(backgroundColor, LIGHTEN),
      color: theme.palette.common.black,
      fontSize: '1.3rem',
      lineHeight: '2rem',
    },
    wordmark: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      display: 'block',
      float: 'right',
      fontFamily: "'RO Serif', 'Times New Roman', Times, serif",
      fontSize: '11px',
      letterSpacing: '.001em',
      lineHeight: '14px',
      marginLeft: '4px',
      marginRight: 0,
      paddingTop: '34px',
      width: '145px',
      [theme.breakpoints.up('md')]: {
        fontSize: '14px',
        lineHeight: '14px',
        marginLeft: '9px',
        marginRight: '21px',
        width: '210px',
      },
    },
    wordmarkSecondary: {
      display: 'block',
      fontStyle: 'italic',
      lineHeight: '14px',
      paddingBottom: '14px',
    },
    wrapper: {
      position: 'relative',
      zIndex: theme.zIndex.appBar,
    },
  });
});

export default useStyles;
