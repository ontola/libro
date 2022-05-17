import { toggleMark as toggleMarkBase } from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { withHistoryEntry } from '../../transforms/withHistoryEntry';

export const toggleMark = (type: string) => (editor: Editor): void => {
  withHistoryEntry(editor, () => {
    toggleMarkBase(editor, type);
  });
};
