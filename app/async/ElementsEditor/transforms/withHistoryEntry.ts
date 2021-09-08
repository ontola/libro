import { Editor } from 'slate';

/**
 * Prevents merging of external command with previous and next command.
 * See Slate's withHistory.
 * (Alternative: manipulate the history?)
 */
export const withHistoryEntry = (editor: Editor, fn: () => void): void => {
  // Prevents merging with previous command
  editor.operations = [];
  fn();
  // Prevents merging of next command
  editor.operations = [];
};
