import { register } from 'link-redux';

import { alertDialogTopology } from '../../topologies/Dialog';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { tabPaneTopology } from '../../topologies/TabPane';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

import getCollection from './getCollection';
import CreateAction from './properties/createAction';
import CollectionFrame from './properties/collectionFrame';
import FilteredCollections from './properties/filteredCollections';
import Name from './properties/name';
import UnreadCount from './properties/unreadCount';
import Pages from './properties/pages';
import InfinitePagination from './properties/infinitePagination';
import DefaultPagination from './properties/defaultPagination';
import voteEvent from './voteEvent';
import CollectionCardAppendix from './CollectionCardAppendix';
import CollectionContainer from './CollectionContainer';
import CollectionInline from './CollectionInline';
import CollectionNavbar from './CollectionNavbar';
import CollectionSection from './CollectionSection';
import CollectionTableCell from './CollectionTableCell';
import Header from './properties/header';
import TotalItems from './properties/totalItems';

import './Collection.scss';

export default [
  CollectionContainer,
  CollectionNavbar,
  CollectionTableCell,
  register(
    getCollection({
      WrappingElement: Container,
      redirect: true,
      renderParent: true,
      renderWhenEmpty: true,
      topology: [
        primaryResourceTopology,
        pageTopology,
      ],
    })
  ),
  register(
    getCollection({
      WrappingElement: Container,
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
        widgetTopologyTopology,
      ],
    })
  ),
  register(
    getCollection({
      WrappingElement: Container,
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
  Name,
  ...UnreadCount,
  ...Pages,
  ...InfinitePagination,
  ...DefaultPagination,
  ...voteEvent,
];
