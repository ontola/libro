import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import Loading, {
  LoadingButton,
  LoadingCard,
  LoadingCardFixed,
  LoadingCardFloat,
  LoadingCardRowAppendix,
  LoadingCellRow,
  LoadingDetail,
  LoadingFullResource,
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
import { appMenuTopology } from '../../topologies/AppMenu';
import { attributeListTopology } from '../../topologies/AttributeList';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { alertDialogTopology } from '../../topologies/Dialog';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { fullResourceTopology } from '../../topologies/FullResource';
import { gridTopology } from '../../topologies/Grid';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { menuTopology } from '../../topologies/Menu';
import { navbarTopology } from '../../topologies/Navbar';
import { pageTopology } from '../../topologies/Page';
import { parentTopology } from '../../topologies/Parent';
import { popupTopology } from '../../topologies/Popup';
import { selectedValueTopology } from '../../topologies/SelectedValue';
import { tableTopology } from '../../topologies/Table';
import { tableCellTopology } from '../../topologies/TableCell';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { tabPaneTopology } from '../../topologies/TabPane';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import { tabBarTopology } from '../../topologies/TabBar';
import { selectTopology } from '../../topologies/Select';

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
      containerTopology,
      cardListTopology,
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
      containerFloatTopology,
      detailsBarTopology,
      contentDetailsTopology,
      tableCellTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardFixed,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    popupTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardFloat,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    cardFloatTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingButton,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    [
      tabBarTopology,
    ],
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
      cardListTopology,
      cardMainTopology,
      cardMicroRowTopology,
      formFooterTopology,
      inlineTopology,
      selectTopology,
      selectedValueTopology,
      voteBubbleTopology,
    ],
  ),
  LinkedRenderStore.registerRenderer(
    Spinner,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    formFooterTopology,
  ),
];
