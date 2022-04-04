import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import MenuItem from '../../components/MenuItem';
import { useShowDialog } from '../../hooks/useShowDialog';
import { menuTopology } from '../../topologies';

const ActionDropdownContent: FC = ({ subject }) => {
  const [name] = useProperty(schema.name);
  const showDialog = useShowDialog(subject.value);

  return (
    <MenuItem
      action={showDialog}
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
