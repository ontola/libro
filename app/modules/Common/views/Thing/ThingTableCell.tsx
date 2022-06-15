import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { register, useStrings } from 'link-redux';
import React from 'react';

import { tableCellTopology } from '../../../../topologies';
import LDDetail from '../../components/LDDetail';
import LDLink from '../../components/LDLink';
import { LinkFeature } from '../../components/Link';
import { NAME_PREDICATES } from '../../lib/metaData';

const ThingTableCell = () => {
  const [name] = useStrings(NAME_PREDICATES);

  return (
    <LDLink
      features={[LinkFeature.Bold, LinkFeature.Centered]}
    >
      <LDDetail text={name} />
    </LDLink>
  );
};

ThingTableCell.type = [schema.Thing, rdfs.Resource];

ThingTableCell.topology = [tableCellTopology];

export default register(ThingTableCell);
