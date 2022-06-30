import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { useShowDialog } from '../../Common/hooks/useShowDialog';
import MenuItem from '../../Menu/components/MenuItem';
import { menuTopology } from '../../Menu/topologies/Menu';

const ActionDropdownContent: FC = ({ subject }) => {
  const [name] = useProperty(schema.name);
  const showDialog = useShowDialog(subject);

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
