import { ChevronRight } from '@mui/icons-material';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import { parentProps } from '../../../../ontology/app';
import { parentTopology } from '../../../../topologies';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { namePredicates } from '../../lib/predicates';

interface ThingParent {
  first?: boolean;
  parent?: SomeNode;
}

const ThingParent: FC<ThingParent> = ({
  first,
  parent,
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
        parent={parent}
        title={name}
      />
      {!first && <ChevronRight fontSize="small" />}
    </React.Fragment>
  );
};

ThingParent.type = schema.Thing;

ThingParent.topology = parentTopology;

export default register(ThingParent);
