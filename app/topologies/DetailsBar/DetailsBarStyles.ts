import { CSSProperties } from '@material-ui/styles';

import { scrollBoxCID } from '../../components/VerticalScroller';
import { LibroTheme } from '../../themes/themes';

interface Styles {
  [className: string]: CSSProperties;
}

const styles = (theme: LibroTheme): Styles => ({
  borderBottom: {
    borderBottom: theme.greyBorder,
  },
  default: {
    height: '2rem',
    margin: '.125rem 0',
  },
  layoutOnly: {
    [`& .${scrollBoxCID}`]: {
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
    '-webkit-overflow-scrolling': 'touch',
    alignItems: 'flex-start',
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
