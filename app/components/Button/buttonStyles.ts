import makeStyles from '@material-ui/styles/makeStyles';

import { LibroTheme } from '../../themes/themes';

export enum ButtonTheme {
  AsCard = 'asCard',
  Box = 'box',
  CardBig = 'cardBig',
  Default = 'default',
  Pagination = 'pagination',
  Submit = 'submit',
  Subtle = 'subtle',
  Transparent = 'transparent',
  Outlined = 'outlined',
}

export enum ButtonVariant {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Yes = 'yes',
  Pro = 'pro',
  Neutral = 'neutral',
  Other = 'other',
  No = 'no',
  Con = 'con',
  Upvote = 'upvote',
  Comment = 'comment',
  Facebook = 'facebook',
  Google = 'google',
  Omniform = 'omniform',
}

const FACEBOOK_COLOUR = 'rgb(59, 89, 152)';
const GOOGLE_COLOUR = '#4285f4';

const variantColorMap = {
  [ButtonVariant.Success]: 'green',
  [ButtonVariant.Warning]: 'orange',
  [ButtonVariant.Error]: 'brown',
  [ButtonVariant.Yes]: 'green',
  [ButtonVariant.Pro]: 'green',
  [ButtonVariant.Neutral]: 'greyVoteButton',
  [ButtonVariant.Other]: 'greyVoteButton',
  [ButtonVariant.No]: 'brown',
  [ButtonVariant.Con]: 'red',
  [ButtonVariant.Upvote]: 'green',
  [ButtonVariant.Comment]: 'greyVoteButton',
};

export default makeStyles<LibroTheme>((theme) => {
  const variantClasses = Object.entries(variantColorMap).reduce((acc, [key, value]) => {
    //@ts-ignore
    const color = theme.palette[value].main;

    return {
      ...acc,
      [key]: {
        '& $icon': {
          color,
          fontSize: '1.2rem',
        },
        '& $label': {
          boxShadow: 'inset 0 -2px 0 0 rgba(0,0,0,0%)',
          color,
          padding: '.3em 0',
          transition: 'box-shadow 200ms',
        },
        '&$active': {
          '& $label': {
            fontWeight: theme.typography.fontWeightBold,
          },
          '& $label, & $icon': {
            color: theme.palette.getContrastText(color),
          },
          backgroundColor: color,
        },
        '&$stretched': {
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          padding: '.75rem 0',
          transition: 'box-shadow 200ms',
        },
        '&:active': {
          backgroundColor: `${theme.palette.grey.xLight} !important`,
        },
        '&:hover, &:focus': {
          '& $label, & $icon': {
            color: theme.palette.getContrastText(color),
          },
          backgroundColor: color,
        },
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
        color,
        display: 'flex',
        fontWeight: theme.typography.fontWeightMedium,
        justifyContent: 'center',
      },
    };
  }, {});

  return ({
    active: {},

    [ButtonTheme.AsCard]: {
      '&:hover, &:focus, &:active': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, .2)',
        color: theme.palette.grey.dark,
      },
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: '0 0 25px rgba(0, 0, 0, .06)',
      color: theme.palette.grey.main,
      marginBottom: '1em',
      transition: '.2s',
    },

    [ButtonTheme.Box]: {
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

    [ButtonTheme.CardBig]: {},

    [ButtonTheme.Default]: {
      backgroundColor: 'var(--accent-background-color, rgb(208, 2, 91))',
      borderRadius: theme.shape.borderRadius,
      color: 'var(--accent-color)',
    },

    [ButtonTheme.Submit]: {
      //@ts-ignore
      backgroundColor: theme.palette.green.main,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      //@ts-ignore
      color: theme.palette.white.main,
    },

    [ButtonTheme.Subtle]: {
      backgroundColor: theme.palette.grey.xxLight,
      border: `1px solid ${theme.palette.grey.xLight}`,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey.midDark,
    },

    [ButtonTheme.Transparent]: {
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
      color: theme.palette.grey.main,
    },

    [ButtonTheme.Outlined]: {
      border: '1px solid currentColor !important',
    },

    [ButtonVariant.Facebook]: {
      color: FACEBOOK_COLOUR,
    },

    [ButtonVariant.Google]: {
      color: GOOGLE_COLOUR,
    },

    [ButtonTheme.Pagination]: {
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
      border: 0,
      display: 'inline-block',
      fontFamily: theme.typography.fontFamily,
      fontSize: '1em',
      margin: 0,
      padding: '.5rem 1.3rem',
      transition: '.1s box-shadow, .1s background-color',
      whiteSpace: 'nowrap',
    },

    buttonPlain: {
      '&:hover, &:focus, &:active': {
        boxShadow: 'none',
      },
      alignSelf: 'initial',
      background: 'none',
      color: 'inherit',
      padding: 0,
    },

    cardFloat: {
      '&:active': {
        color: theme.palette.grey.dark,
      },
      '&:hover': {
        color: theme.palette.grey.midDark,
      },
      color: theme.palette.grey.xxLightForegroundLarge,
      fontWeight: theme.typography.fontWeightBold,
    },

    cardList: {
      '&:active': {
        color: theme.palette.grey.dark,
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
      lineHeight: '1em',
      padding: '.4em',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
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
      padding: '.5rem .75rem',
    },

    omniform: {
      '&$active': {
        '& $label': {
          boxShadow: 'unset',
        },
        '&::after': {
          backgroundColor: theme.palette.grey.xLight,
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
      color: theme.palette.grey.midLight,
      overflow: 'hidden',
      paddingLeft: '.8em',
      paddingRight: '.8em',
      position: 'relative',
    },

    small: {
      fontSize: '.85em',
      padding: '.3rem .5rem',
    },

    snackbar: {
      '&:avtive': {
        //@ts-ignore
        background: theme.palette.transparent.light,
      },
      '&:hover': {
        //@ts-ignore
        background: theme.palette.transparent.xLight,
      },
      //@ts-ignore
      color: theme.palette.red.light,
      fontSize: '.8em',
      fontWeight: theme.typography.fontWeightBold,
      padding: '.75rem',
      textTransform: 'uppercase',
    },

    stretched: {},

    ...variantClasses,
  });
});
