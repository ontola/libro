import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { LoadingButton } from '../../Common/components/Loading';
import ll from '../../Kernel/ontology/ll';
import { actionsBarTopology } from '../topologies';

export default LinkedRenderStore.registerRenderer(
  LoadingButton,
  ll.LoadingResource,
  RENDER_CLASS_NAME,
  actionsBarTopology,
);
