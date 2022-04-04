import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import Loading, {
  LoadingButton,
  LoadingCard,
  LoadingCardFloat,
  LoadingCardRowAppendix,
  LoadingCellRow,
  LoadingDetail,
  LoadingFullResource,
  LoadingGridContent,
  LoadingMicroRow,
  LoadingNavbarLink,
  LoadingPage,
  LoadingParent,
  LoadingRow,
  LoadingSelect,
  LoadingTabbar,
} from '../../components/Loading';
import SuspendedLoader from '../../components/Loading/SuspendedLoader';
import Spinner from '../../components/Spinner';
import ll from '../../ontology/ll';
import {
  actionsBarTopology,
  alertDialogTopology,
  appMenuTopology,
  attributeListTopology,
  cardAppendixTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  cardTopology,
  containerFloatTopology,
  containerTopology,
  contentDetailsTopology,
  detailsBarTopology,
  flowTopology,
  formFooterTopology,
  fullResourceTopology,
  gridTopology,
  hoverBoxTopology,
  inlineTopology,
  listTopology,
  mainBodyTopology,
  menuTopology,
  navbarTopology,
  omniformFieldsTopology,
  pageTopology,
  parentTopology,
  selectTopology,
  selectedValueTopology,
  tabBarTopology,
  tabPaneTopology,
  tableCellTopology,
  tableTopology,
} from '../../topologies';

export default [
  LinkedRenderStore.registerRenderer(
    LoadingPage,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    pageTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingFullResource,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      fullResourceTopology,
      tabPaneTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    LoadingParent,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    parentTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCard,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      alertDialogTopology,
      flowTopology,
      listTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    LoadingButton,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      containerTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    SuspendedLoader,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      gridTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    LoadingMicroRow,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    cardRowTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingSelect,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    selectTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardRowAppendix,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    cardAppendixTopology,
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
      hoverBoxTopology,
      menuTopology,
      omniformFieldsTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCellRow,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      tableTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    LoadingNavbarLink,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    navbarTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingDetail,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      detailsBarTopology,
      contentDetailsTopology,
      tableCellTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardFloat,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      containerFloatTopology,
      cardFloatTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    LoadingButton,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    actionsBarTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingGridContent,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    mainBodyTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingTabbar,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    tabBarTopology,
  ),
  LinkedRenderStore.registerRenderer(
    Loading,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      attributeListTopology,
      listTopology,
      cardMainTopology,
      cardMicroRowTopology,
      formFooterTopology,
      inlineTopology,
      selectTopology,
      selectedValueTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    Spinner,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    formFooterTopology,
  ),
];
