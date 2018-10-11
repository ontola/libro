import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';

import { ActionButton } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('name')])(ActionButton),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  [
    actionsBarTopology,
    cardFloatTopology,
    cardListTopology,
  ]
);
