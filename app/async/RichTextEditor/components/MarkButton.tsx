import { getPreventDefaultHandler, isMarkActive, toggleMark } from '@udecode/slate-plugins';
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
      onClick={(editor: Editor) => getPreventDefaultHandler(toggleMark, editor, type)}
      selected={(editor: Editor) => isMarkActive(editor, type)}
      title={title}
    >
      {children}
    </ToggleButton>
  );
};
