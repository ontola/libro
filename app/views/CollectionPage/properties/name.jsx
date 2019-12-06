import schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { Heading, Link } from '../../../components';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

const CollectionName = ({ linkedProp, subject }) => {
  const lrs = useLRS();
  const href = lrs.getResourceProperty(subject, ontola.href);
  const Wrapper = typeof href !== 'undefined' ? Link : 'div';

  return (
    <Wrapper to={href}>
      <Heading size="2">
        {linkedProp.value}
      </Heading>
    </Wrapper>
  );
};

CollectionName.type = CollectionViewTypes;

CollectionName.property = schema.name;

CollectionName.topology = allTopologies;

CollectionName.propTypes = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

export default register(CollectionName);
