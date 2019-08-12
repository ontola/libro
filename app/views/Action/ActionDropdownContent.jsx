import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { MenuItem } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { menuTopology } from '../../topologies/Menu';

const ActionDropdownContent = ({
  name,
  subject,
}) => (
  <MenuItem
    expandOpen={null}
    subject={subject}
    url={subject}
  >
    {name.value}
  </MenuItem>
);

ActionDropdownContent.type = NS.schema('Action');

ActionDropdownContent.topology = menuTopology;

ActionDropdownContent.mapDataToProps = [
  NS.schema('name'),
];

ActionDropdownContent.propTypes = {
  name: linkType,
  subject: subjectType,
};

export default register(ActionDropdownContent);
