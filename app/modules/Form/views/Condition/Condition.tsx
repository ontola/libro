import * as sh from '@ontologies/shacl';
import {
  Property,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import ontola from '../../../Kernel/ontology/ontola';
import { formContext } from '../../components/Form/FormContext';
import useShapeValidation from '../../hooks/useShapeValidation';

const Condition = () => {
  const shapes = useIds(sh.node);
  const { object } = React.useContext(formContext);
  const [pass] = useShapeValidation(shapes, object);

  if (pass) {
    return <Property label={ontola.pass} />;
  }

  return <Property label={ontola.fail} />;
};

Condition.type = ontola.Condition;

Condition.topology = allTopologies;

export default register(Condition);
