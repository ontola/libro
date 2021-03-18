import {
  ListOptions,
  getPreventDefaultHandler,
  isNodeTypeIn,
  toggleList, 
} from '@udecode/slate-plugins';
import React from 'react';
import { Editor } from 'slate';

import { ToggleButton } from './ToggleButton';

export interface ListButtonProps {
  children: any;
  id: string;
  options: ListOptions;
  title: string;
  type: string;
}

export const ListButton: React.FC<ListButtonProps> = ({
  children,
  id,
  options,
  title,
  type,
}) => {
  return (
    <ToggleButton
      id={id}
      selected={(editor: Editor) => isNodeTypeIn(editor, type)}
      title={title}
      onClick={(editor: Editor) => getPreventDefaultHandler(
        toggleList,
        editor,
        {
          ...options,
          typeList: type,
        },
      )}
    >
      {children}
    </ToggleButton>
  );
};
