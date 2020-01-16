import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import React from 'react';

import {
  Loading,
  LoadingButton,
  LoadingCard,
  LoadingCellRow,
  LoadingDetail,
  LoadingMicroRow,
  LoadingNavbarLink,
  LoadingPage,
  LoadingParent,
  LoadingRow,
  Spinner,
  SuspendedLoader,
} from '../../components';
import ll from '../../ontology/ll';
import { appMenuTopology } from '../../topologies/AppMenu';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { attributeListTopology } from '../../topologies/AttributeList';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import { containerTopology } from '../../topologies/Container';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { alertDialogTopology } from '../../topologies/Dialog';
import { menuTopology } from '../../topologies/Menu';
import { gridTopology } from '../../topologies/Grid';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { navbarTopology } from '../../topologies/Navbar';
import { pageTopology } from '../../topologies/Page';
import { parentTopology } from '../../topologies/Parent';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { tableTopology } from '../../topologies/Table';
import { tableCellTopology } from '../../topologies/TableCell';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import { tabPaneTopology } from '../../topologies/TabPane';
import {
  LoadingCardFloat,
  LoadingCardRowAppendix,
  LoadingWidgetCard,
} from '../../components/Loading/index';

export default [
  LinkedRenderStore.registerRenderer(
    LoadingPage,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      pageTopology,
      primaryResourceTopology,
      tabPaneTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingParent,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    parentTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCard,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      containerTopology,
      cardListTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingWidgetCard,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      gridTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    SuspendedLoader,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingMicroRow,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    cardRowTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardRowAppendix,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    cardAppendixTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingRow,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      appMenuTopology,
      cardTopology,
      cardFixedTopology,
      cardMainTopology,
      menuTopology,
      hoverBoxTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCellRow,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      tableTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingNavbarLink,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    navbarTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingDetail,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      containerFloatTopology,
      detailsBarTopology,
      contentDetailsTopology,
      tableCellTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardFloat,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    cardFloatTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingButton,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      actionsBarTopology,
      cardVoteEventTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    Loading,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      attributeListTopology,
      cardListTopology,
      cardMainTopology,
      cardMicroRowTopology,
      inlineTopology,
      voteBubbleTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    () => <Spinner loading />,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    alertDialogTopology
  ),
];
