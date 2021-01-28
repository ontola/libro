import * as schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Heading from '../../../components/Heading';
import Link from '../../../components/Link';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

const CollectionPageName = ({ linkedProp }) => {
  const [href] = useProperty(ontola.href);
  const Wrapper = typeof href !== 'undefined' ? Link : 'div';

  return (
    <Wrapper to={href}>
      <Heading size="2">
        {linkedProp.value}
      </Heading>
    </Wrapper>
  );
};

CollectionPageName.type = CollectionViewTypes;

CollectionPageName.property = schema.name;

CollectionPageName.topology = allTopologies;

CollectionPageName.propTypes = {
  linkedProp: linkedPropType,
};

export default register(CollectionPageName);
