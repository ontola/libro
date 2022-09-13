import { register, useProperty } from 'link-redux';
import React from 'react';
import { useNavigate } from 'react-router';

import { retrievePath } from '../../../Common/lib/iris';
import { pageTopology } from '../../../Common/topologies';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

const GroupPage = () => {
  const [settingsMenu] = useProperty(ontola.settingsMenu);
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(retrievePath(settingsMenu.value)!, { replace: true });
  }, [settingsMenu]);

  return null;
};

GroupPage.type = argu.Group;

GroupPage.topology = pageTopology;

export default register(GroupPage);
