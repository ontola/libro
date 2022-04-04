import { ChevronRight } from '@material-ui/icons';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { parentProps } from '../../ontology/app';
import { parentTopology } from '../../topologies';

import { namePredicates } from './properties/name';

interface ThingParent {
  first?: boolean;
}

const ThingParent: FC<ThingParent> = ({
  first,
}) => {
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
      {!first && <ChevronRight fontSize="small" />}
    </React.Fragment>
  );
};

ThingParent.type = schema.Thing;

ThingParent.topology = parentTopology;

export default register(ThingParent);
