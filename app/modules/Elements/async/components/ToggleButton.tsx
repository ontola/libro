import { Tooltip } from '@material-ui/core';
import MaterialToggleButton from '@material-ui/lab/ToggleButton';
import React from 'react';

import { ElementsEditor, useElementsEditor } from '../editor';

export interface ToggleButtonProps {
  buttonRef?: React.Ref<HTMLButtonElement>;
  children: any;
  id: string;
  onClick: (editor: ElementsEditor) => (event: any) => any;
  selected: (editor: ElementsEditor) => boolean;
  title: string;
  [name: string]: any;
}

export const ToggleButton = ({
  children,
  id,
  buttonRef,
  onClick,
  selected,
  title,
  ...rest
}: ToggleButtonProps): JSX.Element => {
  const editor = useElementsEditor();

  return (
    <Tooltip
      key={id}
      title={title ?? ''}
    >
      <MaterialToggleButton
        area-label={id}
        data-testid={id}
        selected={selected(editor)}
        value={id}
        onClick={onClick(editor)}
        {...rest}
        ref={buttonRef}
      >
        {children}
      </MaterialToggleButton>
    </Tooltip>
  );
};
