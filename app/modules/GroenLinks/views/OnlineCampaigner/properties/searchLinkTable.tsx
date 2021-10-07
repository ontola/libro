import {
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import teamGL from '../../../../../ontology/teamGL';
import { tableRowTopology } from '../../../../../topologies/TableRow';

const SearchLinkTable = ({ linkedProp }: PropertyProps) => (
  <a
    href={linkedProp.value}
    rel="noopener noreferrer"
    target="_blank"
  >
    Zoeken
  </a>
);

SearchLinkTable.type = teamGL.OnlineCampaigner;

SearchLinkTable.topology = tableRowTopology;

SearchLinkTable.property = teamGL.searchLink;

export default register(SearchLinkTable);
