import {
  getPreventDefaultHandler,
  isMarkActive,
  toggleMark, 
} from '@udecode/slate-plugins';
import React from 'react';
import { Editor } from 'slate';

import { ToggleButton } from './ToggleButton';

export interface MarkButtonProps {
  children: any;
  id: string;
  title: string;
  type: string;
}

export const MarkButton: React.FC<MarkButtonProps> = ({
  children,
  id,
  title,
  type,
}) => {
  return (
    <ToggleButton
      id={id}
      selected={(editor: Editor) => isMarkActive(editor, type)}
      title={title}
      onClick={(editor: Editor) => getPreventDefaultHandler(toggleMark, editor, type)}
    >
      {children}
    </ToggleButton>
  );
};
