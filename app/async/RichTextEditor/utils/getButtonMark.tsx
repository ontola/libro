import { ToolbarMark } from '@udecode/slate-plugins';
import React from 'react';

import { CommandButtonProps } from '../commands/types';

export const getButtonMark = (type: string, icon: JSX.Element): React.FC<CommandButtonProps> => (
  { icon: icon2, ...rest },
) => (
  <ToolbarMark
    type={type}
    icon={icon2 || icon}
    {...rest}
  />
);
