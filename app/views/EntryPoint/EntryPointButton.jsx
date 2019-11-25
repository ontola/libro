import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';

import { ActionButton } from '../../components';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';

export default LinkedRenderStore.registerRenderer(
  link({ name: schema.name })(ActionButton),
  schema.EntryPoint,
  RENDER_CLASS_NAME,
  [
    actionsBarTopology,
    cardFloatTopology,
    cardListTopology,
    containerFloatTopology,
  ]
);
