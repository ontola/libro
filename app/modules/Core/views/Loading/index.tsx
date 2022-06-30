import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { actionsBarTopology } from '../../../Action/topologies/ActionsBar';
import { inlineTopology } from '../../../Common/topologies';
import { attributeListTopology } from '../../../Common/topologies/AttributeList';
import { parentTopology } from '../../../Common/topologies/BreadcrumbsBar';
import { cardTopology } from '../../../Common/topologies/Card';
import { cardAppendixTopology } from '../../../Common/topologies/Card/CardAppendix';
import { cardFixedTopology } from '../../../Common/topologies/Card/CardFixed';
import { cardFloatTopology } from '../../../Common/topologies/Card/CardFloat';
import { cardMainTopology } from '../../../Common/topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../../Common/topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../../Common/topologies/Card/CardRow';
import { containerTopology } from '../../../Common/topologies/Container';
import { containerFloatTopology } from '../../../Common/topologies/Container/ContainerFloat';
import { contentDetailsTopology } from '../../../Common/topologies/ContentDetails';
import { detailsBarTopology } from '../../../Common/topologies/DetailsBar';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import { gridTopology } from '../../../Common/topologies/Grid';
import { hoverBoxTopology } from '../../../Common/topologies/HoverBox';
import { listTopology } from '../../../Common/topologies/List';
import { mainBodyTopology } from '../../../Common/topologies/MainBody';
import { pageTopology } from '../../../Common/topologies/Page';
import { tabBarTopology } from '../../../Common/topologies/TabBar';
import { tabPaneTopology } from '../../../Common/topologies/TabPane';
import { flowTopology } from '../../../Flow/topologies/Flow';
import { formFooterTopology } from '../../../Form/topologies/FormFooter';
import { selectTopology } from '../../../Form/topologies/Select';
import { selectedValueTopology } from '../../../Form/topologies/SelectedValue';
import { appMenuTopology } from '../../../Menu/topologies/AppMenu';
import { menuTopology } from '../../../Menu/topologies/Menu';
import { navbarTopology } from '../../../NavBar/topologies/Navbar';
import { omniformFieldsTopology } from '../../../Omniform/topologies/OmniformFields/OmniformFields';
import Loading, {
  LoadingButton,
  LoadingCard,
  LoadingCardFloat,
  LoadingCardRowAppendix,
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
import Spinner from '../../components/Loading/Spinner';
import SuspendedLoader from '../../components/Loading/SuspendedLoader';
import ll from '../../ontology/ll';

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
