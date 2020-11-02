import { Editor, Range } from 'slate';

import { isSelectionPointValid } from './isSelectionPointValid';

export const isSelectionRangeValid = (editor: Editor, selection: Range): boolean => {
  return isSelectionPointValid(editor, selection.focus)
    && isSelectionPointValid(editor, selection.anchor);
};
