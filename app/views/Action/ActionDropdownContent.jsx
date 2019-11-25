import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { MenuItem } from '../../components';
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

ActionDropdownContent.type = schema.Action;

ActionDropdownContent.topology = menuTopology;

ActionDropdownContent.mapDataToProps = {
  name: schema.name,
};

ActionDropdownContent.propTypes = {
  name: linkType,
  subject: subjectType,
};

export default register(ActionDropdownContent);
