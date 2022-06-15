import 'HelveticaNeueLTStd-Blk.woff';

import 'HelveticaNeueLTStd-Blk.woff2';
import 'SuisseIntl-Black-WebS.woff';
import 'SuisseIntl-Black-WebS.woff2';
import 'SuisseIntl-BlackItalic-WebS.woff';
import 'SuisseIntl-BlackItalic-WebS.woff2';
import 'SuisseIntl-Bold-WebS.woff';
import 'SuisseIntl-Bold-WebS.woff2';
import 'SuisseIntl-BoldItalic-WebS.woff';
import 'SuisseIntl-BoldItalic-WebS.woff2';
import 'SuisseIntl-Book-WebS.woff';
import 'SuisseIntl-Book-WebS.woff2';
import 'SuisseIntl-BookItalic-WebS.woff';
import 'SuisseIntl-BookItalic-WebS.woff2';
import 'SuisseIntl-Light-WebS.woff';
import 'SuisseIntl-Light-WebS.woff2';
import 'SuisseIntl-LightItalic-WebS.woff';
import 'SuisseIntl-LightItalic-WebS.woff2';
import 'SuisseIntl-Medium-WebS.woff';
import 'SuisseIntl-Medium-WebS.woff2';
import 'SuisseIntl-MediumItalic-WebS.woff';
import 'SuisseIntl-MediumItalic-WebS.woff2';
import 'SuisseIntl-Regular-WebS.woff';
import 'SuisseIntl-Regular-WebS.woff2';
import 'SuisseIntl-RegularItalic-WebS.woff';
import 'SuisseIntl-RegularItalic-WebS.woff2';
import 'SuisseIntl-SemiBold-WebS.woff';
import 'SuisseIntl-SemiBold-WebS.woff2';
import 'SuisseIntl-SemiBoldItalic-WebS.woff';
import 'SuisseIntl-SemiBoldItalic-WebS.woff2';
import 'SuisseIntl-Thin-WebS.woff';
import 'SuisseIntl-Thin-WebS.woff2';
import 'SuisseIntl-ThinItalic-WebS.woff';
import 'SuisseIntl-ThinItalic-WebS.woff2';
import 'SuisseIntl-Ultralight-WebS.woff';
import 'SuisseIntl-Ultralight-WebS.woff2';
import 'SuisseIntl-UltralightItalic-WebS.woff';
import 'SuisseIntl-UltralightItalic-WebS.woff2';
import { LibroTheme, MaterialStyleMap } from '../../../themes';

const fontFaces = [
  {
    '@font-face': {
      fontFamily: 'HelveticaNeueLTStd-Blk',
      src: "url('/f_assets/fonts/HelveticaNeueLTStd-Blk.woff2') format('woff2'), url('/f_assets/fonts/HelveticaNeueLTStd-Blk.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 100,
      src: "url('/f_assets/fonts/SuisseIntl-Ultralight-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-Ultralight-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 100,
      src: "url('/f_assets/fonts/SuisseIntl-UltralightItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-UltralightItalic-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 200,
      src: "url('/f_assets/fonts/SuisseIntl-Thin-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-Thin-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 200,
      src: "url('/f_assets/fonts/SuisseIntl-ThinItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-ThinItalic-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 300,
      src: "url('/f_assets/fonts/SuisseIntl-Light-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-Light-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 300,
      src: "url('/f_assets/fonts/SuisseIntl-LightItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-LightItalic-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 400,
      src: "url('/f_assets/fonts/SuisseIntl-Regular-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-Regular-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 400,
      src: "url('/f_assets/fonts/SuisseIntl-RegularItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-RegularItalic-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 450,
      src: "url('/f_assets/fonts/SuisseIntl-Book-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-Book-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 450,
      src: "url('/f_assets/fonts/SuisseIntl-BookItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-BookItalic-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 500,
      src: "url('/f_assets/fonts/SuisseIntl-Medium-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-Medium-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 500,
      src: "url('/f_assets/fonts/SuisseIntl-MediumItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-MediumItalic-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 600,
      src: "url('/f_assets/fonts/SuisseIntl-SemiBold-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-SemiBold-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 600,
      src: "url('/f_assets/fonts/SuisseIntl-SemiBoldItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-SemiBoldItalic-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 700,
      src: "url('/f_assets/fonts/SuisseIntl-Bold-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-Bold-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 700,
      src: "url('/f_assets/fonts/SuisseIntl-BoldItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-BoldItalic-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'normal',
      fontWeight: 900,
      src: "url('/f_assets/fonts/SuisseIntl-Black-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-Black-WebS.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontDisplay: 'swap',
      fontFamily: 'Suisse Webfont',
      fontStyle: 'italic',
      fontWeight: 900,
      src: "url('/f_assets/fonts/SuisseIntl-BlackItalic-WebS.woff2') format('woff2'), url('/f_assets/fonts/SuisseIntl-BlackItalic-WebS.woff') format('woff')",
    },
  },
];

export default (theme: LibroTheme): MaterialStyleMap => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        '.ActionsBar': {
          '&:first-child': {
            borderLeft: 0,
          },
          '.Button': {
            background: theme.palette.grey.xxLight,
            border: 'solid 1px rgb(230, 230, 230)',
            borderBottom: 0,
            borderRight: 0,
            flexGrow: 1,
            marginTop: 0,
            textTransform: 'unset',
          },
        },
        '.Button--submit': {
          backgroundColor: 'var(--accent-background-color)',
        },
        '.CID-Card:': {
          borderRadius: 0,
        },
        '.Container--grid': {
          '&:first-child': {
            paddingTop: 0,
          },
          '.Widget': {
            '.CID-Card': {
              marginBottom: 0,
            },
            '.ContainerHeader': {
              marginTop: 0,
            },
          },
        },
        '.Markdown': {
          'h1, h2': {
            fontWeight: 900,
          },
        },
        '.VisitForm': {
          '.Button': {
            alignItems: 'center',
            display: 'block',
            padding: '1em',
            textAlign: 'center',
            width: '100%',
          },
        },
        fallbacks: fontFaces,
        'h1, h2, .NavBarContent': {
          '&.Heading': {
            fontFamily: 'Suisse Webfont',
            fontWeight: 900,
            textTransform: 'uppercase',
          },
          fontFamily: 'Suisse Webfont',
          fontWeight: 900,
          textTransform: 'uppercase',
        },
      },
    },
  },
});
