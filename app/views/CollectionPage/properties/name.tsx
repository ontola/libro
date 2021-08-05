import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../components/Heading';
import Link from '../../../components/Link';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

interface CollectionPageNameProps {
  linkedProp: SomeTerm;
}

const CollectionPageName: FC<CollectionPageNameProps> = ({ linkedProp }) => {
  const [href] = useProperty(ontola.href);
  const Wrapper = React.useCallback(
    ({ children }) => {
      if (typeof href === 'undefined') {
        return (
          <div>
            {children}
          </div>
        );
      }

      return (
        <Link to={href.value}>
          {children}
        </Link>
      );
    },
    [href],
  );

  return (
    <Wrapper>
      <Heading size={HeadingSize.LG}>
        {linkedProp.value}
      </Heading>
    </Wrapper>
  );
};

CollectionPageName.type = CollectionViewTypes;

CollectionPageName.property = schema.name;

CollectionPageName.topology = allTopologies;

export default register(CollectionPageName);
