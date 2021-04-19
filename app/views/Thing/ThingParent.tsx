import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { parentProps } from '../../ontology/app';
import { parentTopology } from '../../topologies/Parent';

interface ThingParentProps {
  name: SomeTerm;
}

const ThingParent: FC<ThingParentProps> = ({ name }) => {
  if (!name) {
    return null;
  }

  return (
    <React.Fragment>
      <Property label={parentProps} />
      <Breadcrumb
        data-test="Thing-parent"
        label={<Property label={[schema.name, as.name]} />}
        title={name.value}
      />
    </React.Fragment>
  );
};

ThingParent.type = schema.Thing;

ThingParent.topology = parentTopology;

ThingParent.mapDataToProps = {
  name: [schema.name, as.name],
};

export default register(ThingParent);