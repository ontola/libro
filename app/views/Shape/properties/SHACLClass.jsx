import LinkedRenderStore from 'link-lib';
import sh from '@ontologies/shacl';
import {
  LinkedResourceContainer,
  linkedPropType,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { handle } from '../../../helpers/logging';
import { allTopologies } from '../../../topologies';

const SHACLClass = ({ linkedProp, subject }) => {
  const lrs = useLRS();
  const targetShape = lrs.store.anyStatementMatching(
    null,
    sh.targetClass,
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
  sh.PropertyShape,
  sh.class,
  allTopologies
);
