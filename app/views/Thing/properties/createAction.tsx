import schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  Resource,
} from 'link-redux';
import React from 'react';

import link from '../../../ontology/link';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

interface PropTypes {
  isPartOf: SomeNode;
  linkedProp: SomeNode;
  omniform: boolean;
  onLoad: () => void;
  renderPartOf: boolean;
}

const CreateAction: FC<PropTypes> = ({
  linkedProp,
  isPartOf,
  omniform,
  onLoad,
  renderPartOf,
}) => (
  <Resource
    isPartOf={isPartOf}
    omniform={omniform}
    renderPartOf={renderPartOf}
    subject={linkedProp}
    onLoad={onLoad}
  />
);

CreateAction.type = [
  schema.Thing,
  link.Document,
];

CreateAction.property = ontola.createAction;

CreateAction.topology = allTopologies;

CreateAction.mapDataToProps = {
  isPartOf: schema.isPartOf,
};

export default register(CreateAction);
