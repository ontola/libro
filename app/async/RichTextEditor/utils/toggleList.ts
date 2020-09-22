import { ListOptions, toggleList as toggleListBase } from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { withHistoryEntry } from '../transforms/withHistoryEntry';

export const toggleList = (typeList: string, options?: ListOptions) => (editor: Editor) => {
  withHistoryEntry(editor, () => {
    toggleListBase(editor, {
      typeList,
      ...options,
    });
  });
};
