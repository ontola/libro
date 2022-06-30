import { register } from 'link-redux';

import { parentTopology } from '../../../Common/topologies/BreadcrumbsBar';
import teamGL from '../../../GroenLinks/ontology/teamGL';

const UserBreadcrumb = () => null;

UserBreadcrumb.type = teamGL.User;

UserBreadcrumb.topology = parentTopology;

export default register(UserBreadcrumb);
