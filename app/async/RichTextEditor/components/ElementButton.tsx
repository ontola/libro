import { getPreventDefaultHandler, isNodeTypeIn } from '@udecode/slate-plugins';
import React from 'react';
import { Editor } from 'slate';

import { ToggleButton } from './ToggleButton';

export interface ElementButtonProps {
  children: any;
  id: string;
  title: string;
  type: string;
}

export const ElementButton: React.FC<ElementButtonProps> = ({
  children,
  id,
  title,
  type,
}) => {
  return (
    <ToggleButton
      id={id}
      onClick={(editor: Editor) => getPreventDefaultHandler(editor.toggleType, type)}
      selected={(editor: Editor) => isNodeTypeIn(editor, type)}
      title={title}
    >
      {children}
    </ToggleButton>
  );
};
