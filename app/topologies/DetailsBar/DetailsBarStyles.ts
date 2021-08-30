import { CSSProperties } from '@material-ui/styles';

import { LibroTheme } from '../../themes/themes';

interface Styles {
  [className: string]: CSSProperties;
}

const styles = (theme: LibroTheme): Styles => ({
  borderBottom: {
    borderBottom: 'solid 1px rgb(230, 230, 230)',
  },
  default: {
    height: '2rem',
  },
  layoutOnly: {
    '& .scrollbox': {
      padding: 0,
    },
    '--vertical-scroller-background': 'unset !important',
    backgroundColor: 'unset !important',
    borderBottom: 'unset !important',
    borderColor: 'unset !important',
  },
  right: {
    alignSelf: 'flex-end',
    color: theme.palette.grey.xxLightForegroundSmall,
    display: 'flex',
    height: '100%',
    marginLeft: '.5em',
  },
  shared: {
    '--vertical-scroller-background': theme.palette.grey.xxLight,
    '-webkit-overflow-scrolling': 'touch',
    alignItems: 'flex-start',
    backgroundColor: theme.palette.grey.xxLight,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    boxSizing: 'border-box',
    color: theme.palette.grey.xxLightForegroundSmall,
    display: 'flex',
  },
  wide: {
    height: '3em',
  },
});

export default styles;
