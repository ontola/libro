import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  LinkedResourceContainer, subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { handle } from '../../../helpers/logging';
import { allTopologies } from '../../../topologies';

const SHACLClass = ({ linkedProp, subject }) => {
  const lrs = useLRS();
  const targetShape = lrs.store.anyStatementMatching(
    null,
    NS.sh('targetClass'),
    linkedProp,
    null
  );

  if (!targetShape) {
    handle(new Error(`Rendered SHACL::Class for ${subject} without targetShape`));
    return null;
  }

  return (
    <LinkedResourceContainer subject={targetShape.subject} />
  );
};

SHACLClass.propTypes = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

export default LinkedRenderStore.registerRenderer(
  SHACLClass,
  NS.sh('PropertyShape'),
  NS.sh('class'),
  allTopologies
);
