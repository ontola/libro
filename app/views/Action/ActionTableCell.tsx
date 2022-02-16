import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
  useStrings,
} from 'link-redux';
import React from 'react';

import Button, { ButtonTheme } from '../../components/Button';
import { TEXT_PREDICATES } from '../../helpers/metaData';
import useOneClickProps from '../../hooks/useOneClickProps';
import { useShowDialog } from '../../hooks/useShowDialog';
import { tableCellTopology } from '../../topologies/TableCell';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

const ActionTableCell: FC = ({
  subject,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useStrings(schema.name);
  const [text] = useStrings(TEXT_PREDICATES);
  const [error] = useStrings(schema.error);
  const {
    icon,
    loading,
    onClick,
  } = useOneClickProps();
  const showDialog = useShowDialog(subject.value);

  const invalid = invalidStatusIds.includes(rdf.id(actionStatus));
  const title = invalid ? error : text;

  return (
    <Button
      disabled={invalid || loading}
      icon={icon}
      loading={loading}
      theme={ButtonTheme.Subtle}
      title={title}
      onClick={onClick ?? showDialog}
    >
      {name}
    </Button>
  );
};

ActionTableCell.type = schema.Action;

ActionTableCell.topology = tableCellTopology;

export default register(ActionTableCell);
