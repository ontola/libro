import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
  useStrings,
} from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../topologies';
import LDLink from '../../../Common/components/LDLink';
import { LinkFeature, normalizeTarget } from '../../../Common/components/Link';
import { cardFloatTopology } from '../../../Common/topologies/Card/CardFloat';
import { cardMainTopology } from '../../../Common/topologies/Card/CardMain';
import { cardRowTopology } from '../../../Common/topologies/Card/CardRow';
import { containerTopology } from '../../../Common/topologies/Container';
import { containerFloatTopology } from '../../../Common/topologies/Container/ContainerFloat';
import { containerHeaderTopology } from '../../../Common/topologies/Container/ContainerHeader';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import { gridTopology } from '../../../Common/topologies/Grid';
import { listTopology } from '../../../Common/topologies/List';
import { pageTopology } from '../../../Common/topologies/Page';
import { tabPaneTopology } from '../../../Common/topologies/TabPane';
import libro from '../../../Core/ontology/libro';
import { menuTopology } from '../../../Menu/topologies/Menu';
import { tableCellTopology } from '../../../Table/topologies/TableCell';
import { tableFooterCellTopology } from '../../../Table/topologies/TableFooterCell';
import { tableRowTopology } from '../../../Table/topologies/TableRow';
import { isInvalidActionStatus } from '../../hooks/useEnabledActions';
import { actionsBarTopology } from '../../topologies/ActionsBar';

const CreateActionButton: FC = ({ children }) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [error] = useProperty(schema.error);
  const [name] = useProperty(schema.name);
  const [target] = useStrings(libro.target);

  if (children) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  return (
    <LDLink
      disabled={!!error || isInvalidActionStatus(actionStatus)}
      features={[LinkFeature.Bold]}
      target={normalizeTarget(target)}
      title={error?.value ?? name?.value}
    >
      {name?.value}
    </LDLink>
  );
};

CreateActionButton.type = schema.CreateAction;

CreateActionButton.topology = allTopologiesExcept(
  actionsBarTopology,
  alertDialogTopology,
  listTopology,
  cardFloatTopology,
  cardMainTopology,
  cardRowTopology,
  containerTopology,
  containerFloatTopology,
  containerHeaderTopology,
  gridTopology,
  menuTopology,
  fullResourceTopology,
  pageTopology,
  tabPaneTopology,
  tableCellTopology,
  tableFooterCellTopology,
  tableRowTopology,
);

export default register(CreateActionButton);
