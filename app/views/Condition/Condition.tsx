import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { FormContext } from '../../components/Form/Form';
import useShapeValidation from '../../hooks/useShapeValidation';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const Condition = () => {
  const [shape] = useProperty(sh.node) as NamedNode[];
  const { object } = React.useContext(FormContext);
  const pass = useShapeValidation(shape, object);

  if (pass) {
    return <Property label={ontola.pass} />;
  }

  return <Property label={ontola.fail} />;
};

Condition.type = ontola.Condition;

Condition.topology = allTopologies;

export default register(Condition);
