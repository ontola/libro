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
import DefaultPagination from './properties/defaultPagination';
import Header from './properties/header';
import InfinitePagination from './properties/infinitePagination';
import IsPartOf from './properties/isPartOf';
import Name from './properties/name';
import Pages from './properties/pages';
import Pagination from './properties/pagination';
import SortOptions from './properties/sortOptions';
import TotalItems from './properties/totalItems';

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
  ...Header,
  ...IsPartOf,
  ...Name,
  ...Pages,
  Pagination,
  SortOptions,
  ...InfinitePagination,
  ...DefaultPagination,
];
