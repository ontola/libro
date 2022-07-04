import { MaterialStyleMap } from '../../../Common/theme/types';
import '../fonts/RijksoverheidSansText-Bold_2_0.otf';
import '../fonts/RijksoverheidSansText-Italic_2_0.otf';

import '../fonts/RijksoverheidSansText-Regular_2_0.otf';

const fontFaces = [
  {
    '@font-face': {
      fontFamily: '\'RO-Sans\'',
      fontStyle: 'normal',
      fontWeight: 'normal',
      src: 'url(\'/f_assets/fonts/RijksoverheidSansText-Regular_2_0.otf\')',
    },
  },
  {
    '@font-face': {
      fontFamily: '\'RO-Sans\'',
      fontStyle: 'normal',
      fontWeight: 'bold',
      src: 'url(\'/f_assets/fonts/RijksoverheidSansText-Bold_2_0.otf\')',
    },
  },
  {
    '@font-face': {
      fontFamily: '\'RO-Sans\'',
      fontStyle: 'italic',
      fontWeight: 'normal',
      src: 'url(\'/f_assets/fonts/RijksoverheidSansText-Italic_2_0.otf\')',
    },
  },
];

export default (): MaterialStyleMap => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        '.CID-Card': {
          borderRadius: 0,
        },
        fallbacks: fontFaces,
        fontFamily: "'RO-Sans', Calibri, Verdana, sans-serif",
        fontSize: 16,
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: "'RO-Sans', Calibri, Verdana, sans-serif",
        },
      },
    },
  },
});
