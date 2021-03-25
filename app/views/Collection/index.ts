import CollectionCard from './CollectionCard';
import CollectionDialog from './CollectionDialog';
import CollectionVisibleOnEmpty from './CollectionVisibleOnEmpty';
import CollectionWithOmniform from './CollectionWithOmniform';
import CollectionFilterCollection from './properties/collectionFilter';
import CreateAction from './properties/createAction';
import CollectionFrame from './properties/collectionFrame';
import FilterFields from './properties/filterFields';
import IsPartOf from './properties/isPartOf';
import Name from './properties/name';
import UnreadCount from './properties/unreadCount';
import Pages from './properties/pages';
import SortOptions from './properties/sortOptions';
import InfinitePagination from './properties/infinitePagination';
import DefaultPagination from './properties/defaultPagination';
import CollectionCardAppendix from './CollectionCardAppendix';
import CollectionInline from './CollectionInline';
import CollectionFullPage from './CollectionFullPage';
import CollectionPopup from './CollectionPopup';
import CollectionSection from './CollectionSection';
import CollectionTableCell from './CollectionTableCell';
import Header from './properties/header';
import TotalItems from './properties/totalItems';

import './Collection.scss';

export default [
  ...TotalItems,
  CollectionCard,
  CollectionCardAppendix,
  CollectionDialog,
  CollectionInline,
  ...CollectionFrame,
  CollectionFilterCollection,
  CollectionFullPage,
  CollectionPopup,
  ...CollectionSection,
  CollectionTableCell,
  CollectionVisibleOnEmpty,
  CollectionWithOmniform,
  CreateAction,
  ...FilterFields,
  ...Header,
  ...IsPartOf,
  Name,
  ...UnreadCount,
  ...Pages,
  SortOptions,
  ...InfinitePagination,
  ...DefaultPagination,
];
