import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LDLink from '../../components/LDLink';
import { LinkFeature } from '../../components/Link';
import useOneClickProps from '../../hooks/useOneClickProps';
import { tableCellTopology } from '../../topologies/TableCell';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

const ActionTableCell = () => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useProperty(schema.name);
  const [error] = useProperty(schema.error);
  const {
    icon,
    loading,
    onClick,
  } = useOneClickProps();

  const invalid = invalidStatusIds.includes(rdf.id(actionStatus));
  const title = invalid ? error?.value : name?.value;

  return (
    <LDLink
      disabled={invalid || loading}
      features={[LinkFeature.Bold]}
      title={title}
      onClick={onClick}
    >
      {icon ? (
        <FontAwesome
          name={icon}
          spin={loading}
          title={title}
        />
      ) : title}
    </LDLink>
  );
};

ActionTableCell.type = schema.Action;

ActionTableCell.topology = tableCellTopology;

export default register(ActionTableCell);
