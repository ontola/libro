import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import ll from '../../../Kernel/ontology/ll';
import Loading, {
  LoadingButton,
  LoadingCard,
  LoadingCardFixed,
  LoadingCardFloat,
  LoadingCardRowAppendix,
  LoadingDetail,
  LoadingFullResource,
  LoadingGridContent,
  LoadingMicroRow,
  LoadingPage,
  LoadingParent,
  LoadingRow,
  LoadingTabbar,
} from '../../components/Loading';
import { inlineTopology } from '../../topologies';
import { attributeListTopology } from '../../topologies/AttributeList';
import { parentTopology } from '../../topologies/BreadcrumbsBar';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';
import { gridTopology } from '../../topologies/Grid';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { listTopology } from '../../topologies/List';
import { mainBodyTopology } from '../../topologies/MainBody';
import { pageTopology } from '../../topologies/Page';
import { tabBarTopology } from '../../topologies/TabBar';
import { tabPaneTopology } from '../../topologies/TabPane';

export default [
  ...LinkedRenderStore.registerRenderer(
    LoadingPage,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    pageTopology,
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingFullResource,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      fullResourceTopology,
      tabPaneTopology,
    ],
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingParent,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    parentTopology,
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingCard,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      alertDialogTopology,
      listTopology,
    ],
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingButton,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      containerTopology,
    ],
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingCardFixed,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      gridTopology,
    ],
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingMicroRow,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    cardRowTopology,
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingCardRowAppendix,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    cardAppendixTopology,
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingRow,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      cardTopology,
      cardFixedTopology,
      cardMainTopology,
      hoverBoxTopology,
    ],
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingDetail,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      detailsBarTopology,
      contentDetailsTopology,
    ],
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingCardFloat,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      containerFloatTopology,
      cardFloatTopology,
    ],
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingGridContent,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    mainBodyTopology,
  ),
  ...LinkedRenderStore.registerRenderer(
    LoadingTabbar,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    tabBarTopology,
  ),
  ...LinkedRenderStore.registerRenderer(
    Loading,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      attributeListTopology,
      listTopology,
      cardMainTopology,
      cardMicroRowTopology,
      inlineTopology,
    ],
  ),
];
