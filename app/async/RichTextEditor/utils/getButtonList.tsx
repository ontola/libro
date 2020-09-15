import { ListOptions, ToolbarList } from '@udecode/slate-plugins';
import React from 'react';

import { CommandButtonProps } from '../commands/types';

export const getButtonList = (type: string, options: ListOptions, icon: JSX.Element) => (props: CommandButtonProps) => {
  const { icon: icon2, ...rest } = props;
  return (
    <ToolbarList
      {...options}
      typeList={type}
      icon={icon2 || icon}
      {...rest}
    />
  );
};
