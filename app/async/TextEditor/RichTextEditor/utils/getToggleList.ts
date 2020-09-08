import { ListOptions, toggleList } from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { withHistoryEntry } from '../transforms/withHistoryEntry';

export const getToggleList = (typeList: string, options: ListOptions) => (editor: Editor) => {
  withHistoryEntry(editor, () => {
    toggleList(editor, {
      typeList,
      ...options,
    });
  });
};
