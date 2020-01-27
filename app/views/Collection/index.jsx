import { register } from 'link-redux';

import { alertDialogTopology } from '../../topologies/Dialog';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { gridTopology } from '../../topologies/Grid';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { tabPaneTopology } from '../../topologies/TabPane';

import getCollection from './getCollection';
import CreateAction from './properties/createAction';
import CollectionFrame from './properties/collectionFrame';
import FilteredCollections from './properties/filteredCollections';
import Name from './properties/name';
import UnreadCount from './properties/unreadCount';
import Pages from './properties/pages';
import InfinitePagination from './properties/infinitePagination';
import DefaultPagination from './properties/defaultPagination';
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
  Name,
  ...UnreadCount,
  ...Pages,
  ...InfinitePagination,
  ...DefaultPagination,
];
