import * as schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';

import ActionButton from '../../components/ActionButton';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { listTopology } from '../../topologies/List';

export default LinkedRenderStore.registerRenderer(
  link({ name: schema.name })(ActionButton),
  schema.EntryPoint,
  RENDER_CLASS_NAME,
  [
    actionsBarTopology,
    listTopology,
  ],
);
