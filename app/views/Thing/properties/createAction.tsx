import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { ButtonVariant } from '../../../components/Button';
import link from '../../../ontology/link';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { OnDoneHandler } from '../../Action/helpers';

interface PropTypes {
  linkedProp: SomeNode;
  onDone?: OnDoneHandler;
  onLoad: () => void;
  variant: ButtonVariant;
}

const CreateAction: FC<PropTypes> = ({
  linkedProp,
  onDone,
  onLoad,
  variant,
}) => {
  const [isPartOf] = useProperty(schema.isPartOf);

  return(
    <Resource
      isPartOf={isPartOf}
      subject={linkedProp}
      variant={variant}
      onDone={onDone}
      onLoad={onLoad}
    />
  );
};

CreateAction.type = [
  schema.Thing,
  link.Document,
];

CreateAction.property = ontola.createAction;

CreateAction.topology = allTopologies;

export default register(CreateAction);
