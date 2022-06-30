import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { register, useStrings } from 'link-redux';
import React from 'react';

import LDDetail from '../../../Common/components/LDDetail';
import LDLink from '../../../Common/components/LDLink';
import { LinkFeature } from '../../../Common/components/Link';
import { NAME_PREDICATES } from '../../../Common/lib/metaData';
import { tableCellTopology } from '../../topologies/TableCell';

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
