import React from 'react';
import { ToolbarButtonProps, ToolbarMark } from '@udecode/slate-plugins';

export const getButtonMark = (type: string, icon: JSX.Element) => (props: ToolbarButtonProps) => {
  return (
    <ToolbarMark 
      type={type} 
      icon={icon}
      {...props}
    />
  );
};
