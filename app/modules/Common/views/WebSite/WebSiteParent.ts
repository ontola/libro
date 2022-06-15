import * as schema from '@ontologies/schema';
import { register } from 'link-redux';

import argu from '../../../Argu/ontology/argu';
import { parentTopology } from '../../../../topologies';

const WebSiteParent = () => null;

WebSiteParent.type = [schema.Organization, schema.WebSite, argu.Page];

WebSiteParent.topology = parentTopology;

export default register(WebSiteParent);
