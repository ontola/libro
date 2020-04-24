import { register } from 'link-redux';

import { alertDialogTopology } from '../../topologies/Dialog';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { containerTopology } from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { fullResourceTopology } from '../../topologies/FullResource';
import { tabPaneTopology } from '../../topologies/TabPane';

import getCollection from './getCollection';
import CreateAction from './properties/createAction';
import CollectionFrame from './properties/collectionFrame';
import FilteredCollections from './properties/filteredCollections';
import IsPartOf from './properties/isPartOf';
import Name from './properties/name';
import UnreadCount from './properties/unreadCount';
import Pages from './properties/pages';
import SortOptions from './properties/sortOptions';
import InfinitePagination from './properties/infinitePagination';
import DefaultPagination from './properties/defaultPagination';
import CollectionCardAppendix from './CollectionCardAppendix';
import CollectionInline from './CollectionInline';
import CollectionNavbar from './CollectionNavbar';
import CollectionPage from './CollectionPage';
import CollectionSection from './CollectionSection';
import CollectionTableCell from './CollectionTableCell';
import Header from './properties/header';
import TotalItems from './properties/totalItems';

import './Collection.scss';

export default [
  CollectionNavbar,
  CollectionTableCell,
  register(
    getCollection('FullResource', {
      renderWhenEmpty: true,
      topology: [
        fullResourceTopology,
      ],
    })
  ),
  register(
    getCollection('Container', {
      omniform: true,
      renderWhenEmpty: false,
      topology: [
        containerTopology,
      ],
    })
  ),
  register(
    getCollection('AlertDialog', {
      topology: alertDialogTopology,
    })
  ),
  register(
    getCollection('CardAndCardMainAndGrid', {
      renderWhenEmpty: true,
      topology: [
        cardTopology,
        cardMainTopology,
        gridTopology,
      ],
    })
  ),
  register(
    getCollection('TabPane', {
      renderWhenEmpty: true,
      topology: [
        tabPaneTopology,
      ],
    })
  ),
  ...TotalItems,
  CollectionCardAppendix,
  CollectionInline,
  ...CollectionFrame,
  CollectionPage,
  ...CollectionSection,
  CreateAction,
  ...FilteredCollections,
  ...Header,
  ...IsPartOf,
  Name,
  ...UnreadCount,
  ...Pages,
  SortOptions,
  ...InfinitePagination,
  ...DefaultPagination,
];
