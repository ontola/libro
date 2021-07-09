import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import MenuItem from '../../components/MenuItem';
import { menuTopology } from '../../topologies/Menu';

const ActionDropdownContent: FC = ({ subject }) => {
  const [name] = useProperty(schema.name);

  return (
    <MenuItem
      expandOpen={null}
      subject={subject}
      url={subject!.value}
    >
      {name.value}
    </MenuItem>
  );
};

ActionDropdownContent.type = schema.Action;

ActionDropdownContent.topology = menuTopology;

export default register(ActionDropdownContent);
