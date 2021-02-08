import rdf, { Literal, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { LinkFeature, LinkTarget } from '../../components/Link';
import libro from '../../ontology/libro';
import { allTopologiesExcept } from '../../topologies';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';
import { gridTopology } from '../../topologies/Grid';
import { menuTopology } from '../../topologies/Menu';
import { pageTopology } from '../../topologies/Page';
import { tableCellTopology } from '../../topologies/TableCell';
import { tableRowTopology } from '../../topologies/TableRow';
import { tabPaneTopology } from '../../topologies/TabPane';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

interface CreateActionButtonProps {
  actionStatus: SomeTerm;
  error: SomeTerm;
  name: SomeTerm;
  target: Literal;
}

export const isLinkTarget = (prop: string | undefined): prop is LinkTarget => (
  !!prop && Object.values(LinkTarget as any).includes(prop)
);

const normalizeTarget = (targetLiteral: Literal) => {
  const target = targetLiteral?.value?.split('/')?.pop();

  return isLinkTarget(target) ? target : undefined;
};

const CreateActionButton: FC<CreateActionButtonProps> = ({
  actionStatus,
  children,
  error,
  name,
  target,
}) => {
  if (children) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <LDLink
      disabled={!!error || invalidStatusIds.includes(rdf.id(actionStatus))}
      features={[LinkFeature.Bold]}
      target={normalizeTarget(target)}
      title={error?.value || name?.value}
    >
      {name?.value}
    </LDLink>
  );
};

CreateActionButton.type = schema.CreateAction;

CreateActionButton.topology = allTopologiesExcept(
  actionsBarTopology,
  alertDialogTopology,
  cardListTopology,
  cardFloatTopology,
  cardMainTopology,
  cardRowTopology,
  containerFloatTopology,
  gridTopology,
  menuTopology,
  fullResourceTopology,
  pageTopology,
  tabPaneTopology,
  tableCellTopology,
  tableRowTopology,
);

CreateActionButton.mapDataToProps = {
  actionStatus: schema.actionStatus,
  error: schema.error,
  name: schema.name,
  target: libro.target,
};

export default register(CreateActionButton);
