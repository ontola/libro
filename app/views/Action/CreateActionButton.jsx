import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import LDLink from '../../components/LDLink';
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
import { tabPaneTopology } from '../../topologies/TabPane';
import { tableCellTopology } from '../../topologies/TableCell';
import { tableRowTopology } from '../../topologies/TableRow';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

const CreateActionButton = ({
  actionStatus,
  children,
  error,
  name,
  target,
}) => {
  if (children) {
    return children;
  }

  if (error || invalidStatusIds.includes(rdf.id(actionStatus))) {
    return (
      <button
        disabled
        title={error?.value}
      >
        {name?.value}
      </button>
    );
  }

  return (
    <LDLink
      disabled={!!actionStatus}
      target={target?.value?.split('/')?.pop()}
      title={name?.value}
    >
      <Property label={schema.name} />
    </LDLink>
  );
};

CreateActionButton.type = schema.CreateAction;

CreateActionButton.topology = allTopologiesExcept(
  undefined,
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
  tableRowTopology
);

CreateActionButton.mapDataToProps = {
  actionStatus: schema.actionStatus,
  error: schema.error,
  name: schema.name,
  target: libro.target,
};

CreateActionButton.propTypes = {
  actionStatus: linkType,
  children: PropTypes.element,
  error: linkType,
  name: linkType,
  target: linkType,
};

export default register(CreateActionButton);
