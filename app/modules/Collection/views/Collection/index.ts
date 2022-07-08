import { ViewRegistrations } from '../../../../Module';

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
import Name from './properties/name';
import Pages from './properties/pages';
import Pagination from './properties/pagination';
import SortOptions from './properties/sortOptions';
import TotalItems from './properties/totalItems';

const views: ViewRegistrations = [
  ...TotalItems,
  ...CollectionCardAppendix,
  ...CollectionDialog,
  ...CollectionInline,
  ...CollectionFrame,
  ...CollectionFullPage,
  ...CollectionGrid,
  ...CollectionSection,
  ...CollectionTabPane,
  ...CollectionTableCell,
  ...CollectionDefault,
  ...CollectionList,
  ...CreateAction,
  ...Header,
  ...Name,
  ...Pages,
  ...Pagination,
  ...SortOptions,
  ...InfinitePagination,
  ...DefaultPagination,
];

export default views;
