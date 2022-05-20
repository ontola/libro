import { makeStyles } from '@mui/styles';

import { BreakPoints, LibroTheme } from '../../../../themes/themes';

const mapQuestionBoxShadow = 3;

export default makeStyles<LibroTheme>((theme) => ({
  canvas: {
    '& .ol-compass': {
      display: 'inline-block',
      zIndex: 10,
    },
    '& .ol-control': {
      '& button': {
        '&:hover, &:focus': {
          backgroundColor: theme.palette.grey.xLight,
        },
        'alignSelf': 'flex-start',
        'backgroundColor': theme.palette.grey.xxLight,
        'border': `solid 1px ${theme.palette.grey.xLight}`,
        'borderRadius': theme.shape.borderRadius,
        'color': theme.palette.grey.midDark,
        'cursor': 'pointer',
        'display': 'inline-block',
        'fontFamily': theme.typography.fontFamily,
        'fontSize': theme.typography.fontSize,
        'height': '3em',
        'lineHeight': 'unset',
        'marginRight': '0.1em',
        'width': '3em',
      },
      '&.current-location': {
        left: 'auto',
        right: 2,
      },
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0)',
      },
      'backgroundColor': 'rgba(0,0,0,0)',
      'bottom': 2,
      'display': 'inline-block',
      'left': 2,
      'position': 'absolute',
      'top': 'unset',
      'zIndex': 10,
    },
    '& canvas': {
      borderRadius: theme.shape.borderRadius,
    },
    'height': '16rem',
    'maxHeight': '70vh',
    'position': 'relative',
    'zIndex': 9,
  },
  canvasFullscreen: {
    '& .ol-control': {
      bottom: 0,
      position: 'fixed!important',
    },
  },
  canvasLarge: {
    'height': `calc(100vh - ${theme.appBar.height})`,
    'maxHeight': 'unset',
  },
  canvasMapQuestion: {
    boxShadow: theme.shadows[mapQuestionBoxShadow],
  },
  container: {
    backgroundColor: theme.palette.grey.xxLight,
    color: theme.palette.common.black,
    marginBottom: '1rem',
    position: 'relative',
  },
  containerLarge: {
    marginBottom: 0,
  },
  flowInput: {
    height: '35rem',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      height: '40vh',
    },
  },
  indicator: {
    '& .fa': {
      fontSize: '2em',
    },
    'alignItems': 'center',
    'color': theme.palette.grey.main,
    'display': 'flex',
    'flexDirection': 'column',
    'left': 0,
    'margin': 'auto',
    'position': 'absolute',
    'right': 0,
    'top': '50%',
    'zIndex': 9,
  },
}));
