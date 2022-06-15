import { register } from 'link-redux';

import teamGL from '../../../GroenLinks/ontology/teamGL';
import { parentTopology } from '../../../../topologies';

const UserBreadcrumb = () => null;

UserBreadcrumb.type = teamGL.User;

UserBreadcrumb.topology = parentTopology;

export default register(UserBreadcrumb);
