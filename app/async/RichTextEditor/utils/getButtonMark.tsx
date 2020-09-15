import { ToolbarMark } from '@udecode/slate-plugins';
import React from 'react';

import { CommandButtonProps } from '../commands/types';

export const getButtonMark = (type: string, icon: JSX.Element) => (props: CommandButtonProps) => {
  const { icon: icon2, ...rest } = props;
  return (
    <ToolbarMark
      type={type}
      icon={icon2 || icon}
      {...rest}
    />
  );
};
