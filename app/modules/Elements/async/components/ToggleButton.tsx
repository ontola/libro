import { Tooltip } from '@material-ui/core';
import MaterialToggleButton from '@material-ui/lab/ToggleButton';
import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

export interface ToggleButtonProps {
  children: any;
  id: string;
  onClick: (editor: Editor) => (event: any) => any;
  selected: (editor: Editor) => boolean;
  title: string;
  [name: string]: any;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  id,
  onClick,
  selected,
  title,
  ...rest
}) => {
  const editor: Editor = useSlate();

  return (
    <Tooltip key={id} title={title || ''}>
      <MaterialToggleButton
        area-label={id}
        data-testid={id}
        selected={selected(editor)}
        value={id}
        onClick={onClick(editor)}
        {...rest}
      >
        {children}
      </MaterialToggleButton>
    </Tooltip>
  );
};
