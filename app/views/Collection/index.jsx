import { register } from 'link-redux';

import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { containerTopology } from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { fullResourceTopology } from '../../topologies/FullResource';
import { tabPaneTopology } from '../../topologies/TabPane';

import CollectionDialog from './CollectionDialog';
import getCollection, { EMPTY_STRATEGY } from './getCollection';
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
  CollectionTableCell,
  register(
    getCollection('CollectionVisibleOnEmpty', {
      emptyStrategy: EMPTY_STRATEGY.Always,
      topology: [
        fullResourceTopology,
        tabPaneTopology,
        gridTopology,
      ],
    })
  ),
  register(
    getCollection('CollectionWithOmniform', {
      emptyStrategy: EMPTY_STRATEGY.Interactable,
      omniform: true,
      topology: [
        containerTopology,
      ],
    })
  ),
  register(
    getCollection('CardCollection', {
      emptyStrategy: EMPTY_STRATEGY.Interactable,
      topology: [
        cardTopology,
        cardMainTopology,
      ],
    })
  ),
  ...TotalItems,
  CollectionCardAppendix,
  CollectionDialog,
  CollectionInline,
  ...CollectionFrame,
  CollectionFilterCollection,
  CollectionFullPage,
  CollectionPopup,
  ...CollectionSection,
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
