import { register } from 'link-redux';

import { alertDialogTopology } from '../../topologies/Dialog';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { containerTopology } from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { fullResourceTopology } from '../../topologies/FullResource';
import { sideBarTopology } from '../../topologies/SideBar';
import { tabPaneTopology } from '../../topologies/TabPane';

import getCollection from './getCollection';
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
import CollectionSection from './CollectionSection';
import CollectionTableCell from './CollectionTableCell';
import Header from './properties/header';
import TotalItems from './properties/totalItems';

import './Collection.scss';

export default [
  CollectionTableCell,
  register(
    getCollection('FullResourceCollection', {
      renderWhenEmpty: true,
      topology: [
        fullResourceTopology,
      ],
    })
  ),
  register(
    getCollection('ContainerCollection', {
      omniform: true,
      renderWhenEmpty: false,
      topology: [
        containerTopology,
      ],
    })
  ),
  register(
    getCollection('AlertDialogCollection', {
      topology: alertDialogTopology,
    })
  ),
  register(
    getCollection('CardAndCardMainAndGridCollection', {
      renderWhenEmpty: true,
      topology: [
        cardTopology,
        cardMainTopology,
        gridTopology,
      ],
    })
  ),
  register(
    getCollection('SideBarCollection', {
      renderWhenEmpty: true,
      topology: [
        sideBarTopology,
      ],
    })
  ),
  register(
    getCollection('TabPaneCollection', {
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
  CollectionFullPage,
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
