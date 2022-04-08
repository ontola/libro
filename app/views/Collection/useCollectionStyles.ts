import { makeStyles } from '@material-ui/styles';

import { LibroTheme } from '../../themes/themes';

import { defaultPaginationCID } from './properties/defaultPagination';

const MARGIN_LEFT = '1rem';

export const useCollectionStyles = makeStyles((theme: LibroTheme) => ({
  collection: {
    '&:before': {
      backgroundColor: theme.palette.grey.xLight,
      bottom: 0,
      content: '""',
      display: 'block',
      left: `-${MARGIN_LEFT}`,
      position: 'absolute',
      top: 0,
      width: '.3rem',
    },
    marginLeft: MARGIN_LEFT,
    position: 'relative',
    [`& .${defaultPaginationCID}`]: {
      marginBottom: '0.75em',
    },
  },
}));
