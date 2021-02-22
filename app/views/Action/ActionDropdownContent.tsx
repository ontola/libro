import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import MenuItem from '../../components/MenuItem';
import { menuTopology } from '../../topologies/Menu';

interface ActionDropdownContentProps {
  name: SomeTerm;
}

const ActionDropdownContent: FC<ActionDropdownContentProps> = ({
  name,
  subject,
}) => (
  <MenuItem
    expandOpen={null}
    subject={subject}
    url={subject!.value}
  >
    {name.value}
  </MenuItem>
);

ActionDropdownContent.type = schema.Action;

ActionDropdownContent.topology = menuTopology;

ActionDropdownContent.mapDataToProps = {
  name: schema.name,
};

export default register(ActionDropdownContent);
