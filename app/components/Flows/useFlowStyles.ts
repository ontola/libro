import { makeStyles } from '@material-ui/styles';

import { LibroTheme } from '../../themes/themes';

const STEPPER_SCALE_THRESHOLD = 10;
const STEPPER_SCALE_SMALL = 0.7;

const useFlowStyles = makeStyles<LibroTheme, { pageCount: number }>((theme) => ({
  step: {
    '& svg': {
      cursor: 'pointer !important',
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  stepBadge: {
    '&::before': {
      alignItems: 'center',
      backgroundColor: theme.palette.error.main,
      borderRadius: '50%',
      color: theme.palette.error.contrastText,
      content: '"!"',
      display: 'flex',
      height: '1rem',
      justifyContent: 'center',
      marginLeft: '16px',
      marginTop: '-5px',
      opacity: 1,
      position: 'absolute',
      transform: 'scale(1)',
      transition: 'opcacity 100ms, transform 100ms',
      width: '1rem',
      zIndex: 3,
    },
  },
  stepConnector: {
    padding: 0,
  },
  stepValid: {
    '&::before': {
      opacity: 0,
      transform: 'scale(0)',
    },
  },
  stepperRoot: {
    background: 'none',
    transform: ({ pageCount }) => `scale(${pageCount <= STEPPER_SCALE_THRESHOLD ? 1 : STEPPER_SCALE_SMALL})`,
  },
  submitStep: {
    backgroundColor: '#4c4c4c',
    borderRadius: '50%',
    color: 'white',
    fontSize: '1.6rem',
    padding: '5px',
  },
  submitStepActive: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
}));

export default useFlowStyles;
