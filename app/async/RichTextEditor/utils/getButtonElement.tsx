import { ToolbarElement } from '@udecode/slate-plugins';
import React from 'react';

import { CommandButtonProps } from '../commands/types';

export const getButtonElement = (type: string, icon: JSX.Element) => ({ icon: icon2, ...rest }: CommandButtonProps) => (
  <ToolbarElement
    type={type}
    icon={icon2 || icon}
    {...rest}
  />
);
