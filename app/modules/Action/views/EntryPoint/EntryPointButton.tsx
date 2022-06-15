import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import { actionsBarTopology, listTopology } from '../../../../topologies';
import ActionButton from '../../components/ActionButton';

interface EntryPointButton {
  count?: number;
  onClick: React.MouseEventHandler;
}

const EntryPointButton: FC<EntryPointButton> = ({
  count,
  onClick,
}) => {
  const [name] = useStrings(schema.name);

  return (
    <ActionButton
      count={count}
      name={name}
      onClick={onClick}
    />
  );
};

EntryPointButton.type = schema.EntryPoint;

EntryPointButton.topology = [
  actionsBarTopology,
  listTopology,
];

export default register(EntryPointButton);
