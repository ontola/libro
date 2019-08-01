import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import {
  Loading,
  LoadingButton,
  LoadingCard,
  LoadingDetail,
  LoadingMicroRow,
  LoadingNavbarLink,
  LoadingPage,
  LoadingParent,
  LoadingRow,
  Spinner,
} from '../../components';
import { appMenuTopology } from '../../topologies/AppMenu';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import { containerTopology } from '../../topologies/Container';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { alertDialogTopology } from '../../topologies/Dialog';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { gridTopology } from '../../topologies/Grid';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { navbarTopology } from '../../topologies/Navbar';
import { pageTopology } from '../../topologies/Page';
import { parentTopology } from '../../topologies/Parent';
import { tableTopology } from '../../topologies/Table';
import { tableCellTopology } from '../../topologies/TableCell';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import { tabPaneTopology } from '../../topologies/TabPane';
import {
  LoadingCardFloat,
  LoadingCardRowAppendix,
  LoadingWidgetContent,
} from '../../components/Loading/index';

// We always throw, so the implicit return value is void
class SuspendedLoader extends React.Component {
  constructor(props) {
    super(props);

    this.resolve = undefined;
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  componentWillUnmount() {
    this.resolve();
  }

  // eslint-disable-next-line react/require-render-return
  render() {
    throw this.promise;
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    LoadingPage,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      pageTopology,
      tabPaneTopology,
    ]
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
    LoadingWidgetContent,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      gridTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    SuspendedLoader,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
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
    LoadingCardRowAppendix,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    cardAppendixTopology
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
      tableTopology,
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
    [
      containerFloatTopology,
      detailsBarTopology,
      contentDetailsTopology,
      tableCellTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardFloat,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    cardFloatTopology
  ),
  LinkedRenderStore.registerRenderer(
    LoadingButton,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      actionsBarTopology,
      cardVoteEventTopology,
    ]
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
