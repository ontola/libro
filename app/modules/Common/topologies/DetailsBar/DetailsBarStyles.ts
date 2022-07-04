import { CSSProperties } from '@mui/styles';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { detailBarsOverlap, scrollBoxCID } from '../../components/VerticalScroller';

interface Styles {
  [className: string]: CSSProperties;
}

const styles = (theme: LibroTheme): Styles => ({
  borderBottom: {
    borderBottom: theme.greyBorder,
  },
  default: {
    height: '2rem',
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
    background: `linear-gradient(to right, ${theme.palette.transparent.main}, ${theme.palette.background.paper} 15%, ${theme.palette.background.paper})`,
    color: theme.palette.grey.xxLightForegroundSmall,
    display: 'flex',
    height: '100%',
    paddingLeft: detailBarsOverlap,
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
