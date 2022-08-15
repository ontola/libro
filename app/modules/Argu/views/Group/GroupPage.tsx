import { register, useProperty } from 'link-redux';
import { useNavigate } from 'react-router';

import { retrievePath } from '../../../Common/lib/iris';
import { pageTopology } from '../../../Common/topologies';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

const GroupPage = () => {
  const [settingsMenu] = useProperty(ontola.settingsMenu);
  const navigate = useNavigate();

  navigate(retrievePath(settingsMenu.value)!, { replace: true });

  return null;
};

GroupPage.type = argu.Group;

GroupPage.topology = pageTopology;

export default register(GroupPage);
