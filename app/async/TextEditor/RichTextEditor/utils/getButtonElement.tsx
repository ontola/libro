import React from 'react';
import { ToolbarButtonProps, ToolbarElement } from '@udecode/slate-plugins';

export const getButtonElement = (type: string, icon: JSX.Element) => (props: ToolbarButtonProps) => {
  return (
    <ToolbarElement 
      type={type} 
      icon={icon} 
      {...props}
    />
  );
};
