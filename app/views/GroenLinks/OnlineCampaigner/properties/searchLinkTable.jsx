import {
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import teamGL from '../../../../ontology/teamGL';
import { tableRowTopology } from '../../../../topologies/TableRow';

const SearchLinkTable = ({ linkedProp }) => (
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

SearchLinkTable.propTypes = {
  linkedProp: linkedPropType,
};

export default register(SearchLinkTable);
