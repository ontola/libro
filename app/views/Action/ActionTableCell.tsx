import rdf, { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { tableCellTopology } from '../../topologies/TableCell';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

interface ActionTableCellProps {
  actionStatus?: SomeTerm;
}

const ActionTableCell: FC<ActionTableCellProps> = ({
  actionStatus,
}) => {
  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <LDLink>
      <Property label={schema.target}>
        <Property label={schema.image} />
      </Property>
    </LDLink>
  );
};

ActionTableCell.type = schema.Action;

ActionTableCell.topology = tableCellTopology;

ActionTableCell.mapDataToProps = {
  actionStatus: schema.actionStatus,
};

export default register(ActionTableCell);
