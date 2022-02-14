import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { ButtonTheme } from '../../../components/Button';
import link from '../../../ontology/link';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

interface PropTypes {
  linkedProp: SomeNode;
  omniform: boolean;
  onDone: () => void;
  onLoad: () => void;
  responseCallback?: (response: Response) => void;
  theme: ButtonTheme;
}

const CreateAction: FC<PropTypes> = ({
  linkedProp,
  omniform,
  onDone,
  onLoad,
  responseCallback,
  theme,
}) => {
  const [isPartOf] = useProperty(schema.isPartOf);

  return(
    <Resource
      isPartOf={isPartOf}
      omniform={omniform}
      responseCallback={responseCallback}
      subject={linkedProp}
      theme={theme}
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
