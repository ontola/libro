import React from 'react';
import { ListOptions, ToolbarButtonProps, ToolbarList } from '@udecode/slate-plugins';

export const getButtonList = (type: string, options: ListOptions, icon: JSX.Element) => (props: ToolbarButtonProps) => {
  return (
    <ToolbarList
      {...options}
      typeList={type}
      icon={icon}
      {...props}
    />
  );
};

