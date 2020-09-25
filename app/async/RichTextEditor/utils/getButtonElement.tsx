import { ToolbarElement } from '@udecode/slate-plugins';
import React from 'react';

import { CommandButtonProps } from '../commands/types';

export const getButtonElement = (type: string, icon: JSX.Element): React.FC<CommandButtonProps> => (
  { icon: icon2, ...rest },
) => (
  <ToolbarElement
    type={type}
    icon={icon2 || icon}
    {...rest}
  />
);
