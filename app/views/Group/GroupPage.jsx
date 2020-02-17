import { linkType, register } from 'link-redux';
import React from 'react';
import { Redirect } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { pageTopology } from '../../topologies/Page';

const GroupPage = ({ settingsMenu }) => (
  <Redirect to={retrievePath(settingsMenu.value)} />
);

GroupPage.type = argu.Group;

GroupPage.topology = pageTopology;

GroupPage.mapDataToProps = {
  settingsMenu: ontola.settingsMenu,
};

GroupPage.propTypes = {
  settingsMenu: linkType,
};

export default register(GroupPage);
