import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { DialogSize } from '../../middleware/ontolaMiddleware';
import { LibroTheme } from '../../themes/themes';

const backdropAlphaCoefficient = 0.90;
const backdropAlphaCoefficientNoBlur = 0.95;

interface UseDialogContainerStylesProps {
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false | undefined;
}

export const useDialogContainerStyles = makeStyles<LibroTheme, UseDialogContainerStylesProps>((theme) => ({
  childWrapper: {
    padding: '0.5625rem',
  },
  closeButton: {
    alignItems: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    height: '100%',
  },
  closeButtonArea: {
    backdropFilter: 'blur(7px)',
    backgroundColor: alpha(theme.palette.background.paper, backdropAlphaCoefficient),
    height: '3rem',
    left: 0,
    position: 'fixed',
    top: '0px',
    width: '100%',
    zIndex: 1000,
  },
  closeButtonContainer: {
    height: '100%',
  },
  dialogWrapper: {
    margin: 'auto',
    width: ({ maxWidth }) => `min(100%, ${theme.breakpoints.values[maxWidth || DialogSize.Lg]}px)`,
  },
}));

export const useBackdropStyles = makeStyles<LibroTheme>((theme) => ({
  root: {
    '@supports not (backdrop-filter: blur(7px))': {
      backgroundColor: alpha(theme.palette.background.paper, backdropAlphaCoefficientNoBlur),
    },
    backdropFilter: 'blur(7px)',
    backgroundColor: alpha(theme.palette.background.paper, backdropAlphaCoefficient),
  },
}));

export const useDialogStyles = makeStyles({
  scrollBody: {
    '&::after': {
      content: 'unset',
    },
    display: 'flex',
    padding: '4rem 0',
    textAlign: 'unset',
  },
});
