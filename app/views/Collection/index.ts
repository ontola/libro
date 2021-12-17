import { makeStyles } from '@material-ui/styles';

import { LibroTheme } from '../../themes/themes';

import CollectionCardAppendix from './CollectionCardAppendix';
import CollectionDefault from './CollectionDefault';
import CollectionDialog from './CollectionDialog';
import CollectionFullPage from './CollectionFullPage';
import CollectionGrid from './CollectionGrid';
import CollectionInline from './CollectionInline';
import CollectionList from './CollectionList';
import CollectionSection from './CollectionSection';
import CollectionTableCell from './CollectionTableCell';
import CollectionTabPane from './CollectionTabPane';
import CollectionFrame from './properties/collectionFrame';
import CreateAction from './properties/createAction';
import DefaultPagination, { defaultPaginationCID } from './properties/defaultPagination';
import FilterFields from './properties/filterFields';
import Header from './properties/header';
import InfinitePagination from './properties/infinitePagination';
import IsPartOf from './properties/isPartOf';
import Name from './properties/name';
import Pages from './properties/pages';
import Pagination from './properties/pagination';
import SortOptions from './properties/sortOptions';
import TotalItems from './properties/totalItems';

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

export default [
  ...TotalItems,
  CollectionCardAppendix,
  CollectionDialog,
  CollectionInline,
  ...CollectionFrame,
  CollectionFullPage,
  CollectionGrid,
  CollectionSection,
  CollectionTabPane,
  CollectionTableCell,
  CollectionDefault,
  CollectionList,
  CreateAction,
  FilterFields,
  ...Header,
  ...IsPartOf,
  ...Name,
  ...Pages,
  Pagination,
  SortOptions,
  ...InfinitePagination,
  ...DefaultPagination,
];
