import rdf, { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLiterals,
  useProperty,
} from 'link-redux';
import React from 'react';

import LDLink from '../../../components/LDLink';
import { LinkFeature, LinkTarget } from '../../../components/Link';
import libro from '../../../ontology/libro';
import { allTopologiesExcept } from '../../../topologies';
import { actionsBarTopology } from '../../../topologies/ActionsBar';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { containerFloatTopology } from '../../../topologies/Container/ContainerFloat';
import { containerHeaderTopology } from '../../../topologies/Container/ContainerHeader';
import { alertDialogTopology } from '../../../topologies/Dialog';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { gridTopology } from '../../../topologies/Grid';
import { listTopology } from '../../../topologies/List';
import { menuTopology } from '../../../topologies/Menu';
import { pageTopology } from '../../../topologies/Page';
import { tableCellTopology } from '../../../topologies/TableCell';
import { tableFooterCellTopology } from '../../../topologies/TableFooterCell';
import { tableRowTopology } from '../../../topologies/TableRow';
import { tabPaneTopology } from '../../../topologies/TabPane';
import { invalidStatusIds } from '../../Thing/properties/omniform/helpers';

export const isLinkTarget = (prop: string | undefined): prop is LinkTarget => (
  !!prop && Object.values(LinkTarget as any).includes(prop)
);

const normalizeTarget = (targetLiteral: Literal) => {
  const target = targetLiteral?.value?.split('/')?.pop();

  return isLinkTarget(target) ? target : undefined;
};

const CreateActionButton: FC = ({ children }) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [error] = useProperty(schema.error);
  const [name] = useProperty(schema.name);
  const [target] = useLiterals(libro.target);

  if (children) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  return (
    <LDLink
      disabled={!!error || invalidStatusIds.includes(rdf.id(actionStatus))}
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
