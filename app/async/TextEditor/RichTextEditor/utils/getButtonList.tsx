import React from 'react';
import { ToolbarButtonProps, ToolbarList, ListOptions } from '@udecode/slate-plugins';

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

