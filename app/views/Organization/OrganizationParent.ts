import * as schema from '@ontologies/schema';
import { register } from 'link-redux';

import argu from '../../ontology/argu';
import { parentTopology } from '../../topologies/Parent';

const OrganizationParent = () => null;

OrganizationParent.type = [schema.Organization, argu.Page];

OrganizationParent.topology = parentTopology;

export default register(OrganizationParent);
