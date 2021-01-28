import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { FormContext } from '../../components/Form/Form';
import useShapeValidation from '../../hooks/useShapeValidation';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

interface PropTypes {
  shape: SomeNode;
}

const Condition: FC<PropTypes> = ({ shape }) => {
  const { object } = React.useContext(FormContext);
  const pass = useShapeValidation(shape, object);

  if (pass) {
    return <Property label={ontola.pass} />;
  }

  return <Property label={ontola.fail} />;
};

Condition.type = ontola.Condition;

Condition.topology = allTopologies;

Condition.mapDataToProps = {
  shape: sh.node,
};

export default register(Condition);
