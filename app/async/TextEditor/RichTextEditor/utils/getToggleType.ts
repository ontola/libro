import { ToggleTypeEditor, ELEMENT_PARAGRAPH } from '@udecode/slate-plugins';
import { withHistoryEntry } from '../transforms/withHistory';

export const getToggleType = (type: string) => (editor: ToggleTypeEditor) => {
  withHistoryEntry(editor, () => { 
    editor.toggleType(type, ELEMENT_PARAGRAPH);
  });
};
