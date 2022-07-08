import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { LoadingCard } from '../../Common/components/Loading';
import ll from '../../Kernel/ontology/ll';
import { flowTopology } from '../topologies/Flow';

export default [
  ...LinkedRenderStore.registerRenderer(
    LoadingCard,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    flowTopology,
  ),
];
