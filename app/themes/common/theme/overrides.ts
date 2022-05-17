import { Overrides } from '@material-ui/core/styles/overrides';

import { SCREENSIZE } from './screensize';

export const overrides: Overrides = {
  MuiCssBaseline: {
    '@global': {
      '#start-of-content': {
        position: 'relative',
      },

      // Hides Elements for regular users, but should maintain visibility for assistance technology
      '.AriaHidden': {
        height: '1px',
        left: '10000px',
        overflow: 'hidden',
        position: 'absolute',
        top: 'auto',
        width: '1px',
      },

      '.app-container': {
        bottom: '0',
        left: '0',
        overflowY: 'scroll',
        position: 'absolute',
        right: '0',
        top: '0',

        [`(min-width: ${SCREENSIZE.md}) and (max-width: ${SCREENSIZE.lg})`]: {
          bottom: '3em',
        },
      },

      'a': {
        // Prevents browser default color
        color: 'inherit',
        textDecoration: 'none',
      },

      'h1, h2, h3, h4, h5, h6': {
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sansSerif",
      },

      'html': {
        height: '100%',
        // Removes 300ms touch delay on iOS safari
        touchAction: 'manipulation',
        width: '100%',
      },

      'p': {
        marginBottom: '1em',
      },
    },
  },
};
