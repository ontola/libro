import CollectionContainer from './CollectionContainer';
import CollectionDefault from './CollectionDefault';
import CollectionDialog from './CollectionDialog';
import CollectionGrid from './CollectionGrid';
import CollectionList from './CollectionList';
import CollectionTabPane from './CollectionTabPane';
import CreateAction from './properties/createAction';
import CollectionFrame from './properties/collectionFrame';
import FilterFields from './properties/filterFields';
import IsPartOf from './properties/isPartOf';
import Name from './properties/name';
import Pagination from './properties/pagination';
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
  CollectionContainer,
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
