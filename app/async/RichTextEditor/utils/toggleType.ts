import { ELEMENT_PARAGRAPH, ToggleTypeEditor } from '@udecode/slate-plugins';

import { withHistoryEntry } from '../transforms/withHistoryEntry';

export const toggleType = (type: string) => (editor: ToggleTypeEditor) => {
  withHistoryEntry(editor, () => {
    editor.toggleType(type, ELEMENT_PARAGRAPH);
  });
};
