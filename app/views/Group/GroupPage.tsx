import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { Redirect } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { pageTopology } from '../../topologies';

const GroupPage = () => {
  const [settingsMenu] = useProperty(ontola.settingsMenu);
  
  return(
    <Redirect to={retrievePath(settingsMenu.value)!} />
  );
};

GroupPage.type = argu.Group;

GroupPage.topology = pageTopology;

export default register(GroupPage);
