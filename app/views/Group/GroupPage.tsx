import {
  register,
  useProperty,
} from 'link-redux';
import { useNavigate } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { pageTopology } from '../../topologies';

const GroupPage = () => {
  const [settingsMenu] = useProperty(ontola.settingsMenu);
  const navigate = useNavigate();

  navigate(retrievePath(settingsMenu.value)!, { replace: true });

  return null;
};

GroupPage.type = argu.Group;

GroupPage.topology = pageTopology;

export default register(GroupPage);
