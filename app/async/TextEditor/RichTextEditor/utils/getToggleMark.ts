import { toggleMark } from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { withHistoryEntry } from '../transforms/withHistoryEntry';

export const getToggleMark = (type: string) => (editor: Editor) => {
  withHistoryEntry(editor, () => {
    toggleMark(editor, type);
  });
};
