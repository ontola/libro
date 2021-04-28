import IconButton from '@material-ui/core/IconButton';
import rdf, { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { entityIsLoaded, filterFind } from '../../helpers/data';
import { normalizeFontAwesomeIRI, retrievePath } from '../../helpers/iris';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { OMNIFORM_FILTER, invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { CardListOnClick, mapCardListDispatchToProps } from './helpers';

interface ActionContainerFloatProps {
  actionStatus?: SomeNode;
  name?: Literal
  omniform: boolean;
  onClick: CardListOnClick;
  target?: NamedNode;
}

const ActionContainerFloat: FC<ActionContainerFloatProps> = ({
  actionStatus,
  name,
  omniform,
  onClick,
  subject,
  target,
}) => {
  const lrs = useLRS();
  const history = useHistory();
  const [image] = useResourceProperty(target, schema.image);
  useDataInvalidation(target);

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  if (__CLIENT__ && target && !entityIsLoaded(lrs, target)) {
    lrs.queueEntity(target);
  }

  const icon = (
    <FontAwesome
      name={image && normalizeFontAwesomeIRI(image)}
    />
  );
  const useOmniform = omniform && OMNIFORM_FILTER.find(filterFind(subject));

  return (
    <IconButton
      size="small"
      title={name?.value}
      type="button"
      onClick={useOmniform ? onClick : () => history.push(retrievePath(subject.value)!)}
    >
      {icon}
    </IconButton>
  );
};

ActionContainerFloat.type = schema.Action;

ActionContainerFloat.topology = [
  containerFloatTopology,
];

ActionContainerFloat.mapDataToProps = {
  actionStatus: schema.actionStatus,
  name: schema.name,
  object: schema.object,
  target: schema.target,
};

ActionContainerFloat.hocs = [
  connect(null, mapCardListDispatchToProps),
];

ActionContainerFloat.displayName = 'ActionContainerFloatButton';

export default register(ActionContainerFloat);
