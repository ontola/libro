import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { LoadingDetail } from '../../Core/components/Loading';
import ll from '../../Core/ontology/ll';
import { LoadingCellRow } from '../components/LoadingCellRow';
import { tableTopology } from '../topologies/Table';
import { tableCellTopology } from '../topologies/TableCell';

export default [
  LinkedRenderStore.registerRenderer(
    LoadingDetail,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    tableCellTopology,
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCellRow,
    ll.LoadingResource,
    RENDER_CLASS_NAME,
    tableTopology,
  ),
];
