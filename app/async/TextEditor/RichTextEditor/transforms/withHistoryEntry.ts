import { Editor } from 'slate';

export const withHistoryEntry = (editor: Editor, fn: () => void) => {
  // Prevents merging external commands with previous command.
  // See Slate's withHistory.
  // (Alternative: manipulate the history?)
  editor.operations = [];
  fn();
  // Prevents merging of next command
  editor.operations = [];
};
