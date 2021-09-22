import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { parentProps } from '../../ontology/app';
import { parentTopology } from '../../topologies/Parent';

import { namePredicates } from './properties/name';

const ThingParent = () => {
  const [name] = useStrings(namePredicates);

  if (!name) {
    return null;
  }

  return (
    <React.Fragment>
      <Property label={parentProps} />
      <Breadcrumb
        data-test="Thing-parent"
        label={<Property label={namePredicates} />}
        title={name}
      />
    </React.Fragment>
  );
};

ThingParent.type = schema.Thing;

ThingParent.topology = parentTopology;

export default register(ThingParent);
