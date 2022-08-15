import IconButton from '@mui/material/IconButton';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useDataFetching,
  useFields,
  useGlobalIds,
  useProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { useShowDialog } from '../../Common/hooks/useShowDialog';
import { normalizeFontAwesomeIRI } from '../../Common/lib/iris';
import { containerFloatTopology } from '../../Common/topologies';
import { isInvalidActionStatus } from '../hooks/useEnabledActions';

import { CardListOnClick } from './helpers';

interface ActionContainerFloatProps {
  onClick: CardListOnClick;
}

const ActionContainerFloat: FC<ActionContainerFloatProps> = ({
  subject,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useProperty(schema.name);
  const [target] = useGlobalIds(schema.target);
  const showDialog = useShowDialog(subject);

  const [image] = useFields(target, schema.image);
  useDataFetching(target);

  if (isInvalidActionStatus(actionStatus)) {
    return null;
  }

  return (
    <IconButton
      size="small"
      title={name?.value}
      type="button"
      onClick={showDialog}
    >
      <FontAwesome
        name={image && normalizeFontAwesomeIRI(image)}
      />
    </IconButton>
  );
};

ActionContainerFloat.type = schema.Action;

ActionContainerFloat.topology = [
  containerFloatTopology,
];

export default register(ActionContainerFloat);
