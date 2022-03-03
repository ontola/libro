import IconButton from '@material-ui/core/IconButton';
import rdf  from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useDataFetching,
  useFields,
  useGlobalIds,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { filterFind } from '../../helpers/data';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { useShowDialog } from '../../hooks/useShowDialog';
import { useOmniformOpenAction } from '../../state/omniform';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { OMNIFORM_FILTER, invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { CardListOnClick } from './helpers';

interface ActionContainerFloatProps {
  omniform: boolean;
  onClick: CardListOnClick;
}

const ActionContainerFloat: FC<ActionContainerFloatProps> = ({
  omniform,
  subject,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useProperty(schema.name);
  const [target] = useGlobalIds(schema.target);
  const showDialog = useShowDialog(subject.value);
  const [isPartOf] = useIds(schema.isPartOf);

  const [image] = useFields(target, schema.image);
  useDataFetching(target);

  const onClick = useOmniformOpenAction(isPartOf, subject);

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  const useOmniform = omniform && OMNIFORM_FILTER.find(filterFind(subject));

  return (
    <IconButton
      size="small"
      title={name?.value}
      type="button"
      onClick={useOmniform ? onClick : showDialog}
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
