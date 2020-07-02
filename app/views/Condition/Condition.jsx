import sh from '@ontologies/shacl';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import useShapeValidation from '../../hooks/useShapeValidation';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const Condition = ({ shape, ...props }) => {
  const pass = useShapeValidation(shape, props.object);

  if (pass) {
    return <Property {...props} label={ontola.pass} />;
  }

  return <Property {...props} label={ontola.fail} />;
};

Condition.type = ontola.Condition;

Condition.topology = allTopologies;

Condition.mapDataToProps = {
  shape: sh.node,
};

Condition.propTypes = {
  object: linkType,
  shape: linkType,
};

export default register(Condition);
