import CollectionDefault from './CollectionDefault';
import CollectionTabPane from './CollectionTabPane';
import CollectionWithOmniform from './CollectionWithOmniform';
import CollectionFilterCollection from './properties/collectionFilter';
import CreateAction from './properties/createAction';
import CollectionFrame from './properties/collectionFrame';
import FilterFields from './properties/filterFields';
import IsPartOf from './properties/isPartOf';
import Name from './properties/name';
import Pagination from './properties/pagination';
import UnreadCount from './properties/unreadCount';
import Pages from './properties/pages';
import SortOptions from './properties/sortOptions';
import InfinitePagination from './properties/infinitePagination';
import DefaultPagination from './properties/defaultPagination';
import CollectionCardAppendix from './CollectionCardAppendix';
import CollectionInline from './CollectionInline';
import CollectionFullPage from './CollectionFullPage';
import CollectionSection from './CollectionSection';
import CollectionTableCell from './CollectionTableCell';
import Header from './properties/header';
import TotalItems from './properties/totalItems';

import './Collection.scss';

export default [
  ...TotalItems,
  CollectionCardAppendix,
  CollectionInline,
  ...CollectionFrame,
  CollectionFilterCollection,
  CollectionFullPage,
  CollectionSection,
  CollectionTabPane,
  CollectionTableCell,
  CollectionDefault,
  CollectionWithOmniform,
  CreateAction,
  ...FilterFields,
  ...Header,
  ...IsPartOf,
  Name,
  ...UnreadCount,
  ...Pages,
  Pagination,
  SortOptions,
  ...InfinitePagination,
  ...DefaultPagination,
];
