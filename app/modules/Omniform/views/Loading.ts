import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { LoadingRow } from '../../Common/components/Loading';
import ll from '../../Kernel/ontology/ll';
import { omniformFieldsTopology } from '../topologies';

export default LinkedRenderStore.registerRenderer(
  LoadingRow,
  ll.LoadingResource,
  RENDER_CLASS_NAME,
  omniformFieldsTopology,
);
