import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import {
  Loading,
  LoadingNavbarLink,
  LoadingCard,
  LoadingCardFixed,
  LoadingMicroRow,
  LoadingDetail,
  LoadingPage,
  LoadingParent,
  LoadingRow,
  Spinner,
} from '../../components';
import { appMenuTopology } from '../../topologies/AppMenu';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { alertDialogTopology } from '../../topologies/Dialog';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { gridTopology } from '../../topologies/Grid';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { navbarTopology } from '../../topologies/Navbar';
import { pageTopology } from '../../topologies/Page';
import { parentTopology } from '../../topologies/Parent';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

export default [
  LinkedRenderStore.registerRenderer(
    LoadingPage,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    pageTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingParent,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    parentTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCard,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      containerTopology,
      cardListTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardFixed,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      gridTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingMicroRow,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    cardRowTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingRow,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      appMenuTopology,
      cardTopology,
      cardFixedTopology,
      cardMainTopology,
      dropdownContentTopology,
      hoverBoxTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingNavbarLink,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    navbarTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingDetail,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    detailsBarTopology
  ),
  LinkedRenderStore.registerRenderer(
    Loading,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      cardListTopology,
      cardMainTopology,
      inlineTopology,
      voteBubbleTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    () => <Spinner loading />,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    alertDialogTopology
  ),
];
