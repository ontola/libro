import { toggleMark as toggleMarkBase } from '@udecode/plate-common';
import { Editor } from 'slate';

import { withHistoryEntry } from '../../transforms/withHistoryEntry';

export const toggleMark = (type: string) => (editor: Editor): void => {
  withHistoryEntry(editor, () => {
    toggleMarkBase(editor, type);
  });
};
