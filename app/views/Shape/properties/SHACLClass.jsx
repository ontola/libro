import sh from '@ontologies/shacl';
import {
  Resource,
  linkedPropType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { handle } from '../../../helpers/logging';
import { allTopologies } from '../../../topologies';

const SHACLClass = ({ linkedProp, subject }) => {
  const lrs = useLRS();

  const targetShape = React.useMemo(() => lrs.store.find(
    null,
    sh.targetClass,
    linkedProp,
    null
  ), [linkedProp]);

  if (!targetShape) {
    handle(new Error(`Rendered SHACL::Class for ${subject} without targetShape`));

    return null;
  }

  return (
    <Resource subject={targetShape.subject} />
  );
};

SHACLClass.type = sh.PropertyShape;

SHACLClass.property = sh.class;

SHACLClass.topology = allTopologies;

SHACLClass.propTypes = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

export default register(SHACLClass);
