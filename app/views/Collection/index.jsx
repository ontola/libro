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
import InfinitePagination from './properties/infinitePagination';
import DefaultPagination from './properties/defaultPagination';
import CollectionCardAppendix from './CollectionCardAppendix';
import CollectionInline from './CollectionInline';
import CollectionNavbar from './CollectionNavbar';
import CollectionSection from './CollectionSection';
import CollectionTableCell from './CollectionTableCell';
import Header from './properties/header';
import TotalItems from './properties/totalItems';

import './Collection.scss';

export default [
  CollectionNavbar,
  CollectionTableCell,
  register(
    getCollection({
      redirect: true,
      renderWhenEmpty: true,
      topology: [
        fullResourceTopology,
      ],
    })
  ),
  register(
    getCollection({
      omniform: true,
      renderWhenEmpty: false,
      topology: [
        containerTopology,
      ],
    })
  ),
  register(
    getCollection({
      topology: alertDialogTopology,
    })
  ),
  register(
    getCollection({
      renderWhenEmpty: true,
      topology: [
        cardTopology,
        cardMainTopology,
        gridTopology,
      ],
    })
  ),
  register(
    getCollection({
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
  ...CollectionSection,
  CreateAction,
  ...FilteredCollections,
  ...Header,
  ...IsPartOf,
  Name,
  ...UnreadCount,
  ...Pages,
  ...InfinitePagination,
  ...DefaultPagination,
];
