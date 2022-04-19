import makeStyles from '@material-ui/styles/makeStyles';

import { LibroTheme, Margin } from '../../themes/themes';

export enum ButtonVariant {
  AsCard = 'asCard',
  Box = 'box',
  CardBig = 'cardBig',
  Default = 'default',
  Omniform = 'omniform',
  Pagination = 'pagination',
  Submit = 'submit',
  Subtle = 'subtle',
  Toggle = 'toggle',
  Transparent = 'transparent',
  Filled = 'filled',
  Outlined = 'outlined',
}

interface ColorProps {
  color?: string;
}

export default makeStyles<LibroTheme, ColorProps>((theme) => ({
  active: {},

  button: {
    '&:active': {
      boxShadow: 'inset 0 0 0 999px rgba(0, 0, 0, .06)',
      outline: 0,
      transition: '0s box-shadow',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '&:hover, &:focus': {
      boxShadow: 'inset 0 0 0 999px rgba(0, 0, 0, .03)',
    },
    '&:is(a)': {
      alignItems: 'center',
    },
    '&[disabled]': {
      '&:active, &:hover': {
        boxShadow: 'none',
      },
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '--button-padding-horizontal': '1.3rem',
    '--button-padding-vertical': '.5rem',
    border: 0,
    display: 'inline-block',
    fontFamily: theme.typography.fontFamily,
    fontSize: '1em',
    margin: 0,
    padding: 'var(--button-padding-vertical) var(--button-padding-horizontal)',
    transition: '.1s box-shadow, .1s background-color',
    whiteSpace: 'nowrap',
  },

  [ButtonVariant.AsCard]: {
    '&:hover, &:focus, &:active': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 2px 8px rgba(0, 0, 0, .2)',
      color: theme.palette.grey.xDark,
    },
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 0 25px rgba(0, 0, 0, .06)',
    color: theme.palette.grey.main,
    marginBottom: '1em',
    transition: '.2s',
  },

  [ButtonVariant.Box]: {
    '&$active': {
      backgroundColor: theme.palette.grey.xLight,
    },
    '&:last-child': {
      borderRight: 0,
    },
    alignSelf: 'stretch',
    borderRight: `1px solid ${theme.palette.grey.xLight}`,
    color: theme.palette.grey.main,
    flexGrow: 1,
  },

  [ButtonVariant.CardBig]: {},

  [ButtonVariant.Default]: {
    backgroundColor: 'var(--accent-background-color, rgb(208, 2, 91))',
    borderRadius: theme.shape.borderRadius,
    color: 'var(--accent-color)',
  },

  [ButtonVariant.Submit]: {
    //@ts-ignore
    backgroundColor: theme.palette.green.main,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    //@ts-ignore
    color: theme.palette.common.white,
  },

  [ButtonVariant.Subtle]: {
    backgroundColor: theme.palette.grey.xxLight,
    border: `1px solid ${theme.palette.grey.xLight}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.grey.midDark,
  },

  [ButtonVariant.Transparent]: {
    '&$active': {
      '& $label': {
        boxShadow: `inset 0 -2px 0 0 ${theme.palette.grey.main}`,
        fontWeight: theme.typography.fontWeightBold,
      },
      backgroundColor: theme.palette.background.default,
    },
    '&:hover, &:focus': {
      color: theme.palette.grey.dark,
    },
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.grey.main,
  },

  [ButtonVariant.Omniform]: {
    '&$active': {
      '& $label': {
        boxShadow: 'unset',
        fontWeight: theme.typography.fontWeightBold,
      },
      color: theme.palette.grey.midDark,
    },
    '&::after': {
      backgroundColor: 'rgba(0,0,0,0)',
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      content: '""',
      height: '6px',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '&:hover, &:focus': {
      color: theme.palette.grey.dark,
    },
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.grey.midLight,
    overflow: 'hidden',
    paddingLeft: '.8em',
    paddingRight: '.8em',
    position: 'relative',
  },
  [ButtonVariant.Outlined]: {
    '& $label': {
      marginTop: '-4px',
    },
    '&:hover, &:focus': {
      backgroundColor: ({ color }) => color,
      borderColor: ({ color }) => color,
      color: ({ color }) => theme.palette.getContrastText(color ?? theme.palette.primary.main),
    },
    alignItems: 'center',
    border: '1px solid currentColor',
    borderRadius: theme.shape.borderRadius,
    color: ({ color }) => color,
    display: 'flex',
    gap: theme.spacing(Margin.Small),
    padding: theme.spacing(Margin.Medium),
    transition: 'background-color 100ms, color 100ms, border-color 100ms',
  },
  [ButtonVariant.Filled]: {
    '& $label': {
      marginTop: '-4px',
    },
    backgroundColor: ({ color }) => color ?? theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: ({ color }) => theme.palette.getContrastText(color ?? theme.palette.primary.main),
    display: 'flex',
    gap: theme.spacing(Margin.Small),
    padding: theme.spacing(Margin.Medium),
  },
  [ButtonVariant.Pagination]: {
    '&$active': {
      '& $label': {
        boxShadow: `inset 0 -2px 0 0 ${theme.palette.grey.main}`,
        fontWeight: theme.typography.fontWeightBold,
      },
      backgroundColor: 'unset',
      color: theme.palette.text.primary,
    },
    '&:hover, &:focus': {
      color: theme.palette.grey.dark,
    },
    '&[disabled]': {
      '& $fa': {
        color: theme.palette.grey.light,
      },
      color: theme.palette.grey.light,
      cursor: 'initial',
      fontWeight: theme.typography.fontWeightBold,
      opacity: 1,
    },
    color: theme.palette.grey.main,
  },

  buttonPlain: {
    '&:hover, &:focus, &:active': {
      boxShadow: 'none',
    },
    '--button-padding-horizontal': 0,
    '--button-padding-vertical': 0,
    alignSelf: 'initial',
    background: 'none',
    color: 'inherit',
  },

  cardFloat: {
    '&:active': {
      color: theme.palette.grey.xDark,
    },
    '&:hover': {
      color: theme.palette.grey.midDark,
    },
    color: theme.palette.grey.xxLightForegroundLarge,
    fontWeight: theme.typography.fontWeightBold,
  },

  cardList: {
    '&:active': {
      color: theme.palette.grey.xDark,
    },
    '&:hover': {
      color: theme.palette.grey.midDark,
    },
    color: theme.palette.grey.xxLightForegroundLarge,
    fontSize: '.8rem',
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: '.7rem',
  },

  centered: {
    '& $label': {
      textAlign: 'center',
      width: '100%',
    },
  },

  corner: {
    '--button-padding-horizontal': '.4rem',
    '--button-padding-vertical': '.4rem',
    lineHeight: '1em',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },

  edgeEnd: {
    marginLeft: 'var(--button-padding-horizontal)',
  },

  edgeStart: {
    marginLeft: 'calc(var(--button-padding-horizontal) * -1)',
  },

  fa: {},

  grow: {
    flexGrow: 1,
  },

  hasChildren: {},

  hasIcon: {
    '& $label': {
      marginLeft: '4px',
    },
    '&$hasChildren': {
      '& $label': {
        marginLeft: '4px',
      },
    },
  },

  icon: {},

  label: {},

  margins: {
    margin: '0 .5rem',
  },

  narrow: {
    '--button-padding-horizontal': '.75rem',
    '--button-padding-vertical': '.5rem',
  },

  small: {
    '--button-padding-horizontal': '.5rem',
    '--button-padding-vertical': '.3rem',
    fontSize: '.85em',
  },

  snackbar: {
    '&:active': {
      //@ts-ignore
      background: theme.palette.transparent.light,
    },
    '&:hover': {
      //@ts-ignore
      background: theme.palette.transparent.xLight,
    },
    '--button-padding-horizontal': '.75rem',
    '--button-padding-vertical': '.75rem',
    //@ts-ignore
    color: theme.palette.red.light,
    fontSize: '.8em',
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
  },

  stretched: {},

  [ButtonVariant.Toggle]: {
    '& $icon': {
      fontSize: '1.2rem',
    },
    '& $label': {
      boxShadow: 'inset 0 -2px 0 0 rgba(0,0,0,0%)',
      padding: '.3em 0',
      transition: 'box-shadow 200ms',
    },
    '&$active': {
      '& $label': {
        fontWeight: theme.typography.fontWeightBold,
      },
      '& $label, & $icon': {
        color: 'var(--buttonText)',
      },
      backgroundColor: 'var(--buttonBackground)',
    },
    '&$cardFloat': {
      '--button-padding-horizontal': '.5rem',
      '--button-padding-vertical': 0,
    },
    '&$stretched': {
      '--button-padding-horizontal': 0,
      '--button-padding-vertical': '.75rem',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      transition: 'box-shadow 200ms',
    },
    '&:active': {
      backgroundColor: `${theme.palette.grey.xLight} !important`,
    },
    '&:hover, &:focus': {
      '& $label, & $icon': {
        color: 'var(--buttonText)',
      },
      backgroundColor: 'var(--buttonBackground)',
    },
    '--buttonBackground': ({ color }) => color ? color : theme.palette.grey.main,
    '--buttonText': ({ color }) => color ? theme.palette.getContrastText(color) : theme.palette.common.white,
    alignItems: 'center',
    border: '1px solid currentColor !important',
    borderRadius: theme.shape.borderRadius,
    color: ({ color }) => color ? color : theme.palette.grey.main,
    display: 'flex',
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'center',
  },
}));
